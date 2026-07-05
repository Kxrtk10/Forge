"use client";

import { ArrowRight, Check, ChevronLeft, Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/input";
import {
  buildProjectContext,
  clearDiscoveryDraft,
  discoveryQuestions,
  getDiscoveryDraft,
  saveDiscoveryDraft,
  saveProjectContext,
} from "@/services/project-service";
import type { DiscoveryAnswer } from "@/types/project";
import { cn } from "@/lib/utils";

export function CreateProjectWizard() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<DiscoveryAnswer[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [autosavedAt, setAutosavedAt] = useState("Not saved yet");
  const [isFinishing, setIsFinishing] = useState(false);

  const question = discoveryQuestions[questionIndex];
  const answeredCount = answers.filter((answer) => !answer.skipped && answer.answer.trim()).length;
  const progress = Math.round((answers.length / discoveryQuestions.length) * 100);
  const isLastQuestion = questionIndex === discoveryQuestions.length - 1;

  useEffect(() => {
    const draft = getDiscoveryDraft();
    if (!draft) {
      return;
    }

    setAnswers(draft.answers);
    setQuestionIndex(Math.min(draft.currentQuestion, discoveryQuestions.length - 1));
    setAutosavedAt("Restored draft");

    const restoredQuestion = discoveryQuestions[Math.min(draft.currentQuestion, discoveryQuestions.length - 1)];
    const restoredAnswer = draft.answers.find((answer) => answer.questionId === restoredQuestion.id);
    setCurrentAnswer(restoredAnswer?.skipped ? "" : restoredAnswer?.answer ?? "");
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      saveDiscoveryDraft({
        answers,
        currentQuestion: questionIndex,
        updatedAt: new Date().toISOString(),
      });
      setAutosavedAt(`Autosaved ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`);
    }, 450);

    return () => window.clearTimeout(timeout);
  }, [answers, questionIndex]);

  const knownAnswers = useMemo(
    () =>
      answers
        .filter((answer) => !answer.skipped && answer.answer.trim())
        .slice(-3)
        .map((answer) => {
          const answeredQuestion = discoveryQuestions.find((item) => item.id === answer.questionId);
          return { prompt: answeredQuestion?.prompt ?? "Answer", answer: answer.answer };
        }),
    [answers],
  );

  function saveCurrentAnswer(skipped: boolean) {
    const nextAnswer: DiscoveryAnswer = {
      questionId: question.id,
      answer: skipped ? "" : currentAnswer.trim(),
      skipped,
    };

    setAnswers((current) => [
      ...current.filter((answer) => answer.questionId !== question.id),
      nextAnswer,
    ]);

    return nextAnswer;
  }

  function goToQuestion(nextIndex: number) {
    const nextQuestion = discoveryQuestions[nextIndex];
    const existing = answers.find((answer) => answer.questionId === nextQuestion.id);
    setQuestionIndex(nextIndex);
    setCurrentAnswer(existing?.skipped ? "" : existing?.answer ?? "");
  }

  function continueFlow(skipped = false) {
    const nextAnswer = saveCurrentAnswer(skipped);
    const nextAnswers = [...answers.filter((answer) => answer.questionId !== question.id), nextAnswer];

    if (isLastQuestion) {
      finishDiscovery(nextAnswers);
      return;
    }

    const nextIndex = questionIndex + 1;
    const nextQuestion = discoveryQuestions[nextIndex];
    const existing = nextAnswers.find((answer) => answer.questionId === nextQuestion.id);
    setAnswers(nextAnswers);
    setQuestionIndex(nextIndex);
    setCurrentAnswer(existing?.skipped ? "" : existing?.answer ?? "");
  }

  function finishDiscovery(finalAnswers: DiscoveryAnswer[]) {
    setIsFinishing(true);
    const context = buildProjectContext(finalAnswers);
    saveProjectContext(context);
    clearDiscoveryDraft();

    window.setTimeout(() => {
      window.location.href = `/dashboard/projects/${context.id}`;
    }, 500);
  }

  function goBack() {
    if (questionIndex === 0) {
      return;
    }

    saveCurrentAnswer(false);
    goToQuestion(questionIndex - 1);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <Card className="p-6 md:p-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Question {questionIndex + 1} of {discoveryQuestions.length}</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
              {question.prompt}
            </h2>
          </div>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-sm text-muted-foreground">
            {progress}%
          </span>
        </div>

        <Textarea
          value={currentAnswer}
          onChange={(event) => setCurrentAnswer(event.target.value)}
          placeholder={question.placeholder}
          className="min-h-44 text-base leading-7"
          autoFocus
        />

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button variant="secondary" type="button" onClick={goBack} disabled={questionIndex === 0 || isFinishing}>
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="ghost" type="button" onClick={() => continueFlow(true)} disabled={isFinishing}>
              Skip for now
            </Button>
            <Button type="button" onClick={() => continueFlow(false)} disabled={isFinishing || !currentAnswer.trim()}>
              {isFinishing ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {isLastQuestion ? "Build context" : "Continue"}
              {!isFinishing ? <ArrowRight className="h-4 w-4" /> : null}
            </Button>
          </div>
        </div>
      </Card>

      <aside className="grid content-start gap-4">
        <Card className="p-5">
          <div className="mb-4 flex items-center justify-between text-sm">
            <span className="font-medium">Understanding progress</span>
            <span className="text-muted-foreground">{answeredCount}/{discoveryQuestions.length}</span>
          </div>
          <div className="h-2 rounded-full bg-white/10">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-4 text-xs text-muted-foreground">{autosavedAt}</p>
        </Card>

        <Card className="p-5">
          <h3 className="text-sm font-semibold">What Forge knows so far</h3>
          <div className="mt-4 grid gap-3">
            {knownAnswers.length > 0 ? (
              knownAnswers.map((item) => (
                <div key={item.prompt} className="rounded-2xl border border-white/10 bg-white/[0.035] p-3">
                  <p className="text-xs text-muted-foreground">{item.prompt}</p>
                  <p className="mt-2 line-clamp-3 text-sm leading-6">{item.answer}</p>
                </div>
              ))
            ) : (
              <p className="text-sm leading-6 text-muted-foreground">
                Answer one question at a time. Forge will build context before giving advice.
              </p>
            )}
          </div>
        </Card>

        <div className={cn("rounded-2xl border border-white/10 bg-white/[0.025] p-4 text-sm leading-6 text-muted-foreground")}>
          No report will be generated yet. First, Forge learns what you are building.
        </div>
      </aside>
    </div>
  );
}
