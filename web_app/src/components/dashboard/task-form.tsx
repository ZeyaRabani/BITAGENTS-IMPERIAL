"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";

interface TaskFormProps {
  onSubmit: (data: { title: string; budget: string; deadline: string }) => void;
  disabled?: boolean;
}

export function TaskForm({ onSubmit, disabled }: TaskFormProps) {
  const [title, setTitle] = useState("Build SaaS landing page");
  const [budget, setBudget] = useState("3.0");
  const [deadline, setDeadline] = useState("5");
  const [description, setDescription] = useState(
    "Create a complete SaaS landing page with hero, features, pricing, and CTA."
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({ title, budget: `${budget} SOL`, deadline: `${deadline} minutes` });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 border-2 border-border bg-surface p-6"
    >
      <div>
        <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Task Title
        </label>
        <Input
          className="mt-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={disabled}
        />
      </div>
      <div>
        <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Description
        </label>
        <Textarea
          className="mt-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={disabled}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Budget (SOL)
          </label>
          <Input
            className="mt-2"
            type="number"
            step="0.1"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            disabled={disabled}
          />
        </div>
        <div>
          <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Deadline (minutes)
          </label>
          <Input
            className="mt-2"
            type="number"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            disabled={disabled}
          />
        </div>
      </div>
      <Button
        type="submit"
        disabled={disabled}
        className="w-full font-mono uppercase tracking-widest"
      >
        Submit Task → Escrow
      </Button>
    </form>
  );
}
