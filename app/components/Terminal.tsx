"use client";

import { useState, useRef, useCallback, useEffect, type ReactNode } from "react";
import { config } from "../config";

interface CommandHistory {
  command: string;
  output: ReactNode;
  timestamp: Date;
}

interface Suggestion {
  command: string;
  description: string;
}

export default function Terminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandHistory[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input on mount and click
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  // Command handlers
  const commands: Record<string, (args: string[]) => ReactNode> = {
    help: () => (
      <div className="space-y-2">
        <p className="text-terminal-yellow font-semibold">Available Commands:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {Object.entries(config.commands).map(([cmd, desc]) => (
            <div key={cmd} className="flex gap-4">
              <span className="text-terminal-green w-20">{cmd}</span>
              <span className="text-terminal-text-muted">{desc}</span>
            </div>
          ))}
        </div>
        <p className="text-terminal-text-muted mt-4 text-sm">
          Tip: Use <span className="text-terminal-yellow">[Tab]</span> for auto-completion,{" "}
          <span className="text-terminal-yellow">[↑][↓]</span> for history,{" "}
          <span className="text-terminal-yellow">[Esc]</span> to clear input.
        </p>
      </div>
    ),

    about: () => (
      <div className="space-y-3">
        <p className="text-terminal-cyan font-semibold text-lg">{config.about.greeting}</p>
        <p>{config.about.description}</p>
        <div className="mt-2">
          <p className="text-terminal-yellow mb-2">Quick Facts:</p>
          <ul className="list-disc list-inside space-y-1 text-terminal-text-muted">
            {config.about.details.map((detail, i) => (
              <li key={i}>{detail}</li>
            ))}
          </ul>
        </div>
      </div>
    ),

    projects: () => (
      <div className="space-y-4">
        <p className="text-terminal-yellow font-semibold">My Projects:</p>
        {config.projects.map((project, i) => (
          <div key={i} className="border-l-2 border-terminal-green pl-4">
            <p className="text-terminal-green font-semibold">{project.name}</p>
            <p className="text-terminal-text-muted">{project.description}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {project.tech.map((tech, j) => (
                <span
                  key={j}
                  className="text-xs px-2 py-1 bg-terminal-bg-secondary rounded text-terminal-cyan"
                >
                  {tech}
                </span>
              ))}
            </div>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="terminal-link text-sm mt-2 inline-block"
            >
              View on GitHub →
            </a>
          </div>
        ))}
      </div>
    ),

    skills: () => (
      <div className="space-y-4">
        <p className="text-terminal-yellow font-semibold">Technical Skills:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-terminal-green mb-2">Languages</p>
            <div className="flex flex-wrap gap-2">
              {config.skills.languages.map((skill, i) => (
                <span key={i} className="text-terminal-text">{skill}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-terminal-green mb-2">Frontend</p>
            <div className="flex flex-wrap gap-2">
              {config.skills.frontend.map((skill, i) => (
                <span key={i} className="text-terminal-text">{skill}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-terminal-green mb-2">Backend</p>
            <div className="flex flex-wrap gap-2">
              {config.skills.backend.map((skill, i) => (
                <span key={i} className="text-terminal-text">{skill}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-terminal-green mb-2">Tools</p>
            <div className="flex flex-wrap gap-2">
              {config.skills.tools.map((skill, i) => (
                <span key={i} className="text-terminal-text">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),

    experience: () => (
      <div className="space-y-4">
        <p className="text-terminal-yellow font-semibold">Work Experience:</p>
        {config.experience.map((exp, i) => (
          <div key={i} className="border-l-2 border-terminal-blue pl-4">
            <p className="text-terminal-blue font-semibold">{exp.role}</p>
            <p className="text-terminal-cyan">{exp.company}</p>
            <p className="text-terminal-text-muted text-sm">{exp.period}</p>
            <p className="text-terminal-text mt-1">{exp.description}</p>
          </div>
        ))}
      </div>
    ),

    social: () => (
      <div className="space-y-3">
        <p className="text-terminal-yellow font-semibold">Connect with me:</p>
        <div className="space-y-2">
          {Object.entries(config.social).map(([platform, handle]) => (
            <div key={platform} className="flex gap-4">
              <span className="text-terminal-green w-24 capitalize">{platform}:</span>
              <span className="text-terminal-text">{handle}</span>
            </div>
          ))}
        </div>
      </div>
    ),

    contact: () => (
      <div className="space-y-3">
        <p className="text-terminal-yellow font-semibold">Get in Touch:</p>
        <p>Email: <a href={`mailto:${config.social.email}`} className="terminal-link">{config.social.email}</a></p>
        <p>Feel free to reach out for collaborations, opportunities, or just to say hi!</p>
      </div>
    ),

    clear: () => {
      setHistory([]);
      return null;
    },

    banner: () => (
      <div className="ascii-art">
        {config.ascii.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    ),

    whoami: () => (
      <p>
        <span className="text-terminal-green">{config.username}</span>
        {" @ "}
        <span className="text-terminal-cyan">{config.hostname}</span>
      </p>
    ),

    date: () => (
      <p className="text-terminal-text">
        {new Date().toLocaleString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        })}
      </p>
    ),

    echo: (args) => (
      <p className="text-terminal-text">{args.join(" ")}</p>
    ),

    history: () => (
      <div className="space-y-1">
        {commandHistory.map((cmd, i) => (
          <div key={i} className="text-terminal-text-muted">
            <span className="text-terminal-yellow">{i + 1}</span> {cmd}
          </div>
        ))}
      </div>
    ),

    repo: () => {
      window.open(config.social.github, "_blank");
      return <p className="text-terminal-green">Opening GitHub profile...</p>;
    },
  };

  const executeCommand = useCallback((cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    const [commandName, ...args] = trimmedCmd.split(" ");
    const lowerCommand = commandName.toLowerCase();

    let output: ReactNode;

    if (commands[lowerCommand]) {
      output = commands[lowerCommand](args);
    } else if (lowerCommand === "") {
      output = null;
    } else {
      output = (
        <p className="output-error">
          Command not found: {commandName}. Type <span className="text-terminal-yellow">help</span> for available commands.
        </p>
      );
    }

    if (lowerCommand !== "clear") {
      setHistory((prev) => [
        ...prev,
        { command: trimmedCmd, output, timestamp: new Date() },
      ]);
      setCommandHistory((prev) => [...prev, trimmedCmd]);
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Tab - Auto completion
    if (e.key === "Tab") {
      e.preventDefault();
      if (suggestions.length > 0) {
        setInput(suggestions[selectedSuggestion].command);
        setShowSuggestions(false);
      }
      return;
    }

    // Escape - Clear input
    if (e.key === "Escape") {
      setInput("");
      setShowSuggestions(false);
      return;
    }

    // Arrow up - Previous command
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
      return;
    }

    // Arrow down - Next command
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = Math.min(commandHistory.length - 1, historyIndex + 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
      return;
    }

    // Enter - Execute command
    if (e.key === "Enter") {
      executeCommand(input);
      setInput("");
      setHistoryIndex(-1);
      setShowSuggestions(false);
      return;
    }

    // Navigate suggestions
    if (e.key === "ArrowUp" && showSuggestions) {
      e.preventDefault();
      setSelectedSuggestion((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    } else if (e.key === "ArrowDown" && showSuggestions) {
      e.preventDefault();
      setSelectedSuggestion((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    setHistoryIndex(-1);

    // Generate suggestions
    if (value.trim()) {
      const matches = Object.entries(config.commands)
        .filter(([cmd]) => cmd.startsWith(value.toLowerCase()))
        .map(([cmd, desc]) => ({ command: cmd, description: desc }));
      setSuggestions(matches);
      setShowSuggestions(matches.length > 0);
      setSelectedSuggestion(0);
    } else {
      setShowSuggestions(false);
    }
  };

  // Initial banner on mount
  useEffect(() => {
    const bannerOutput = commands.banner([]);
    const welcomeOutput = (
      <div className="space-y-2">
        <p className="text-terminal-text-muted">
          Welcome to my terminal portfolio! Type <span className="text-terminal-yellow">help</span> to get started.
        </p>
      </div>
    );
    setHistory([
      { command: "", output: bannerOutput, timestamp: new Date() },
      { command: "", output: welcomeOutput, timestamp: new Date() },
    ]);
  }, []);

  return (
    <div className="min-h-screen w-full bg-terminal-bg p-4 md:p-8 flex items-center justify-center">
      <div className="terminal-window w-full max-w-4xl h-[85vh] md:h-[80vh]">
        {/* Terminal Header */}
        <div className="terminal-header">
          <div className="flex gap-2">
            <div className="terminal-button close" />
            <div className="terminal-button minimize" />
            <div className="terminal-button maximize" />
          </div>
          <div className="terminal-title">{config.title}</div>
        </div>

        {/* Terminal Content */}
        <div
          ref={terminalRef}
          className="terminal-content"
          onClick={handleTerminalClick}
        >
          {/* Command History */}
          {history.map((item, index) => (
            <div key={index}>
              {item.command && (
                <div className="command-line">
                  <span className="prompt">
                    {config.username}@{config.hostname}:~$
                  </span>
                  <span className="text-terminal-text">{item.command}</span>
                </div>
              )}
              {item.output && (
                <div className="output-line mb-4">{item.output}</div>
              )}
            </div>
          ))}

          {/* Current Input */}
          <div className="command-line">
            <span className="prompt">
              {config.username}@{config.hostname}:~$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="command-input"
              placeholder="Type a command..."
              autoComplete="off"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck="false"
            />
            <span className="cursor" />
          </div>

          {/* Suggestions */}
          {showSuggestions && (
            <div className="suggestions">
              {suggestions.map((suggestion, index) => (
                <div
                  key={suggestion.command}
                  className={`suggestion-item ${
                    index === selectedSuggestion ? "selected" : ""
                  }`}
                  onClick={() => {
                    setInput(suggestion.command);
                    setShowSuggestions(false);
                    inputRef.current?.focus();
                  }}
                >
                  <span className="font-semibold">{suggestion.command}</span>
                  <span className="text-xs ml-2 opacity-70">
                    {suggestion.description}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
