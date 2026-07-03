"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type {
  Deliverable,
  DemoAgentId,
  DemoAgentState,
  DemoEvent,
  EscrowStep,
  PaymentEdge,
} from "@/lib/demo-script";
import { demoAgents, demoScript } from "@/lib/demo-script";

export interface LogEntry {
  id: number;
  from: string;
  to: string;
  protocol: string;
  message: string;
}

export interface SubtaskState {
  id: string;
  name: string;
  budget: string;
  awardedTo?: string;
  awardedAmount?: string;
  bids: { agent: string; amount: string; confidence: number }[];
  escrowStep?: EscrowStep;
}

export interface ComputeBid {
  provider: string;
  amount: string;
  latency: string;
  awarded?: boolean;
}

export interface DemoState {
  running: boolean;
  finished: boolean;
  phase: string;
  elapsedMs: number;
  agents: Record<DemoAgentId, { state: DemoAgentState; task?: string }>;
  logs: LogEntry[];
  subtasks: SubtaskState[];
  masterEscrow?: EscrowStep;
  computeRequest?: { buyer: string; spec: string };
  computeBids: ComputeBid[];
  computeAwarded?: { provider: string; amount: string };
  deliverables: Deliverable[];
  payments: PaymentEdge[];
}

function initialState(): DemoState {
  return {
    running: false,
    finished: false,
    phase: "",
    elapsedMs: 0,
    agents: Object.fromEntries(
      demoAgents.map((a) => [a.id, { state: "idle" as DemoAgentState }])
    ) as DemoState["agents"],
    logs: [],
    subtasks: [],
    computeBids: [],
    deliverables: [],
    payments: [],
  };
}

function applyEvent(state: DemoState, event: DemoEvent, logId: number): DemoState {
  switch (event.type) {
    case "phase":
      return { ...state, phase: event.phase };
    case "log":
      return {
        ...state,
        logs: [
          ...state.logs,
          { id: logId, from: event.from, to: event.to, protocol: event.protocol, message: event.message },
        ],
      };
    case "agent":
      return {
        ...state,
        agents: {
          ...state.agents,
          [event.agent]: { state: event.state, task: event.task ?? state.agents[event.agent].task },
        },
      };
    case "subtask":
      return {
        ...state,
        subtasks: [
          ...state.subtasks,
          { id: event.id, name: event.name, budget: event.budget, bids: [] },
        ],
      };
    case "bid":
      return {
        ...state,
        subtasks: state.subtasks.map((st) =>
          st.id === event.subtask
            ? { ...st, bids: [...st.bids, { agent: event.agent, amount: event.amount, confidence: event.confidence }] }
            : st
        ),
      };
    case "award":
      return {
        ...state,
        subtasks: state.subtasks.map((st) =>
          st.id === event.subtask
            ? { ...st, awardedTo: event.agent, awardedAmount: event.amount }
            : st
        ),
      };
    case "escrow":
      if (event.escrow === "master") return { ...state, masterEscrow: event.step };
      return {
        ...state,
        subtasks: state.subtasks.map((st) =>
          st.id === event.escrow ? { ...st, escrowStep: event.step } : st
        ),
      };
    case "compute-request":
      return { ...state, computeRequest: { buyer: event.buyer, spec: event.spec } };
    case "compute-bid":
      return {
        ...state,
        computeBids: [
          ...state.computeBids,
          { provider: event.provider, amount: event.amount, latency: event.latency },
        ],
      };
    case "compute-award":
      return {
        ...state,
        computeAwarded: { provider: event.provider, amount: event.amount },
        computeBids: state.computeBids.map((b) => ({ ...b, awarded: b.provider === event.provider })),
      };
    case "deliverable":
      return { ...state, deliverables: [...state.deliverables, event.deliverable] };
    case "payment":
      return { ...state, payments: [...state.payments, event.edge] };
    case "done":
      return { ...state, running: false, finished: true, phase: "Economy settled" };
  }
}

export function useDemoEngine() {
  const [state, setState] = useState<DemoState>(initialState);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const tickerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    if (tickerRef.current) {
      clearInterval(tickerRef.current);
      tickerRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    clearTimers();
    setState({ ...initialState(), running: true });
    const startedAt = Date.now();
    tickerRef.current = setInterval(() => {
      setState((s) => (s.running ? { ...s, elapsedMs: Date.now() - startedAt } : s));
    }, 250);
    demoScript.forEach((event, i) => {
      const timer = setTimeout(() => {
        setState((s) => applyEvent(s, event, i));
        if (event.type === "done" && tickerRef.current) {
          clearInterval(tickerRef.current);
          tickerRef.current = null;
        }
      }, event.at);
      timersRef.current.push(timer);
    });
  }, [clearTimers]);

  const reset = useCallback(() => {
    clearTimers();
    setState(initialState());
  }, [clearTimers]);

  useEffect(() => clearTimers, [clearTimers]);

  return { state, start, reset };
}
