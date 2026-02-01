"use client";

import {
  useState,
  useRef,
  useCallback,
  useEffect,
  createContext,
  useContext,
  type ReactNode,
} from "react";
import { config } from "../config";
import { themes, defaultTheme } from "../themes";

// Theme Context
interface ThemeContextType {
  currentTheme: string;
  setTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: defaultTheme,
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

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
  const [currentTheme, setCurrentTheme] = useState(defaultTheme);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("terminal-theme");
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  // Apply theme CSS variables
  useEffect(() => {
    const theme = themes[currentTheme];
    if (theme) {
      const root = document.documentElement;
      root.style.setProperty("--terminal-bg", theme.colors.background);
      root.style.setProperty(
        "--terminal-bg-secondary",
        theme.colors.backgroundSecondary,
      );
      root.style.setProperty("--terminal-border", theme.colors.border);
      root.style.setProperty("--terminal-text", theme.colors.text);
      root.style.setProperty("--terminal-text-muted", theme.colors.textMuted);
      root.style.setProperty("--terminal-green", theme.colors.primary);
      root.style.setProperty("--terminal-blue", theme.colors.secondary);
      root.style.setProperty("--terminal-yellow", theme.colors.accent);
      root.style.setProperty("--terminal-red", theme.colors.error);
      root.style.setProperty("--terminal-cyan", theme.colors.info);
      root.style.setProperty("--terminal-purple", theme.colors.secondary);
      root.style.setProperty("--terminal-orange", theme.colors.warning);
      root.style.setProperty("--cursor-color", theme.colors.cursor);
      root.style.setProperty("--grid-color", theme.colors.grid);
    }
  }, [currentTheme]);

  const setTheme = useCallback((themeName: string) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
      localStorage.setItem("terminal-theme", themeName);
      return true;
    }
    return false;
  }, []);

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

  // Enhanced argTab autocomplete
  const argTab = (
    inputValue: string,
    setInputValue: (val: string) => void,
  ): Suggestion[] => {
    const trimmed = inputValue.trim().toLowerCase();
    const parts = trimmed.split(" ");
    const command = parts[0];

    // themes command autocomplete
    if (command === "themes") {
      if (parts.length === 1 || (parts.length === 2 && parts[1] === "")) {
        return [{ command: "themes set", description: "Set a theme" }];
      }
      if (parts[1] === "s" || parts[1] === "se" || parts[1] === "set") {
        if (parts.length === 2 || (parts.length === 3 && parts[2] === "")) {
          return Object.keys(themes).map((theme) => ({
            command: `themes set ${theme}`,
            description: themes[theme].name,
          }));
        }
        if (parts.length === 3) {
          const partial = parts[2];
          return Object.keys(themes)
            .filter((theme) => theme.startsWith(partial))
            .map((theme) => ({
              command: `themes set ${theme}`,
              description: themes[theme].name,
            }));
        }
      }
    }

    // projects command autocomplete
    if (command === "projects") {
      if (parts.length === 1 || (parts.length === 2 && parts[1] === "")) {
        return [{ command: "projects go", description: "Go to a project" }];
      }
      if (parts[1] === "g" || parts[1] === "go") {
        if (parts.length === 2 || (parts.length === 3 && parts[2] === "")) {
          return config.projects.map((project, i) => ({
            command: `projects go ${i + 1}`,
            description: project.name,
          }));
        }
      }
    }

    // social command autocomplete
    if (command === "social") {
      if (parts.length === 1 || (parts.length === 2 && parts[1] === "")) {
        return [{ command: "social go", description: "Go to a social link" }];
      }
      if (parts[1] === "g" || parts[1] === "go") {
        if (parts.length === 2 || (parts.length === 3 && parts[2] === "")) {
          return [
            { command: "social go 1", description: "GitHub" },
            { command: "social go 2", description: "LinkedIn" },
            { command: "social go 3", description: "Twitter" },
            { command: "social go 4", description: "Website" },
          ];
        }
      }
    }

    return [];
  };

  // Command handlers
  const commands: Record<string, (args: string[]) => ReactNode> = {
    help: () => (
      <div className="space-y-2">
        <p className="text-terminal-yellow font-semibold">
          Available Commands:
        </p>
        <div className="flex flex-col gap-1">
          {Object.entries(config.commands).map(([cmd, desc]) => (
            <div key={cmd} className="flex">
              <span className="text-terminal-green w-24">{cmd}</span>
              <span className="text-terminal-text-muted">{desc}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 space-y-1 text-sm text-terminal-text-muted">
          <p>
            <span className="text-terminal-yellow">[Tab]</span> or{" "}
            <span className="text-terminal-yellow">[Ctrl+i]</span> auto-complete
          </p>
          <p>
            <span className="text-terminal-yellow">[↑][↓]</span> navigate
            history
          </p>
          <p>
            <span className="text-terminal-yellow">[Ctrl+L]</span> clear
            terminal
          </p>
          <p>
            <span className="text-terminal-yellow">[Esc]</span> clear input
          </p>
        </div>
      </div>
    ),

    welcome: () => (
      <div className="space-y-2">
        <div className="ascii-art">
          {config.ascii.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
        <p className="text-terminal-text-muted">
          Welcome to my terminal portfolio! Type{" "}
          <span className="text-terminal-yellow">help</span> to get started.
        </p>
      </div>
    ),

    about: () => (
      <div className="space-y-3">
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

    education: () => (
      <div className="space-y-4">
        <p className="text-terminal-yellow font-semibold">Education:</p>
        {config.education.map((edu, i) => (
          <div key={i} className="border-l-2 border-terminal-purple pl-4">
            <p className="text-terminal-purple font-semibold">{edu.degree}</p>
            <p className="text-terminal-cyan">{edu.institution}</p>
            <p className="text-terminal-text mt-1">{edu.description}</p>
          </div>
        ))}
      </div>
    ),

    projects: (args) => {
      if (args[0] === "go" && args[1]) {
        const index = parseInt(args[1]) - 1;
        if (config.projects[index]) {
          window.open(config.projects[index].link, "_blank");
          return (
            <p className="text-terminal-green">
              Opening {config.projects[index].name}...
            </p>
          );
        }
        return (
          <p className="output-error">
            Invalid project number. Use "projects" to see available projects.
          </p>
        );
      }

      return (
        <div className="space-y-4">
          <p className="text-terminal-yellow font-semibold">
            My Projects (use "projects go &lt;number&gt;" to open):
          </p>
          {config.projects.map((project, i) => (
            <div key={i} className="border-l-2 border-terminal-green pl-4">
              <p className="text-terminal-green font-semibold">
                {i + 1}. {project.name}
              </p>
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
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="terminal-link text-sm mt-2 inline-block"
                >
                  View on GitHub →
                </a>
              )}
            </div>
          ))}
        </div>
      );
    },

    skills: () => {
      return (
        <div className="space-y-3">
          <p className="text-terminal-yellow font-semibold">Technical Skills</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
            <div>
              <p className="text-terminal-green text-sm mb-1">Languages</p>
              <p className="text-terminal-text">
                {config.skills.languages.map((s) => s.name).join(", ")}
              </p>
            </div>
            <div>
              <p className="text-terminal-green text-sm mb-1">Frontend</p>
              <p className="text-terminal-text">
                {config.skills.frontend.map((s) => s.name).join(", ")}
              </p>
            </div>
            <div>
              <p className="text-terminal-green text-sm mb-1">Backend</p>
              <p className="text-terminal-text">
                {config.skills.backend.map((s) => s.name).join(", ")}
              </p>
            </div>
            <div>
              <p className="text-terminal-green text-sm mb-1">DevOps</p>
              <p className="text-terminal-text">
                {config.skills.devops.map((s) => s.name).join(", ")}
              </p>
            </div>
            <div>
              <p className="text-terminal-green text-sm mb-1">Tools</p>
              <p className="text-terminal-text">
                {config.skills.tools.map((s) => s.name).join(", ")}
              </p>
            </div>
          </div>

          <div className="mt-3 mb-2">
            <p className="text-terminal-green text-sm mb-1">Practices</p>
            <p className="text-terminal-text">
              {config.skills.practices.join(", ")}
            </p>
          </div>
        </div>
      );
    },

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

    social: (args) => {
      const socials = [
        { name: "github", url: config.social.github, label: "GitHub" },
        { name: "linkedin", url: config.social.linkedin, label: "LinkedIn" },
        { name: "website", url: config.social.website, label: "Website" },
      ];

      if (args[0] === "go" && args[1]) {
        const index = parseInt(args[1]) - 1;
        if (socials[index]) {
          window.open(socials[index].url, "_blank");
          return (
            <p className="text-terminal-green">
              Opening {socials[index].label}...
            </p>
          );
        }
        return (
          <p className="output-error">
            Invalid option. Use "social" to see available options.
          </p>
        );
      }

      return (
        <div className="space-y-3">
          <p className="text-terminal-yellow font-semibold">
            Connect with me (use "social go &lt;number&gt;" to open):
          </p>
          <div className="space-y-2">
            {socials.map((social, i) => (
              <div key={social.name} className="flex gap-4">
                <span className="text-terminal-yellow w-8">{i + 1}.</span>
                <span className="text-terminal-green w-20 capitalize">
                  {social.name}:
                </span>
                <span className="text-terminal-text">{social.url}</span>
              </div>
            ))}
          </div>
        </div>
      );
    },

    contact: () => (
      <div className="space-y-3">
        <p className="text-terminal-yellow font-semibold">Get in Touch:</p>
        <p>
          Email:{" "}
          <a href={`mailto:${config.social.email}`} className="terminal-link">
            {config.social.email}
          </a>
        </p>
        <p>
          Feel free to reach out for collaborations, opportunities, or just to
          say hi!
        </p>
      </div>
    ),

    gui: () => {
      window.open(config.social.website, "_blank");
      return <p className="text-terminal-green">Opening GUI portfolio...</p>;
    },

    pwd: () => <p className="text-terminal-text">/home/{config.username}</p>,

    themes: (args) => {
      if (args[0] === "set" && args[1]) {
        const themeName = args[1];
        if (setTheme(themeName)) {
          return (
            <p className="text-terminal-green">
              Theme changed to {themes[themeName].name}
            </p>
          );
        }
        return (
          <p className="output-error">
            Theme &quot;{themeName}&quot; not found. Available themes:{" "}
            {Object.keys(themes).join(", ")}
          </p>
        );
      }

      return (
        <div className="space-y-3">
          <p className="text-terminal-yellow font-semibold">
            Available Themes (use "themes set &lt;name&gt;"):
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {Object.entries(themes).map(([key, theme]) => (
              <div key={key} className="flex gap-4">
                <span className="text-terminal-green w-24">{key}</span>
                <span className="text-terminal-text-muted">{theme.name}</span>
                <span
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: theme.colors.primary }}
                />
              </div>
            ))}
          </div>
          <p className="text-terminal-text-muted text-sm mt-2">
            Current theme:{" "}
            <span className="text-terminal-cyan">
              {themes[currentTheme]?.name || currentTheme}
            </span>
          </p>
        </div>
      );
    },

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
      </p>
    ),

    echo: (args) => (
      <p className="text-terminal-text">{args.join(" ").replace(/"/g, "")}</p>
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

  const executeCommand = useCallback(
    (cmd: string) => {
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
            Command not found: {commandName}. Type{" "}
            <span className="text-terminal-yellow">help</span> for available
            commands.
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
    },
    [currentTheme],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Ctrl+L - Clear terminal
    if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setHistory([]);
      return;
    }

    // Tab or Ctrl+i - Auto completion
    if (e.key === "Tab" || (e.key === "i" && e.ctrlKey)) {
      e.preventDefault();

      // Try advanced autocomplete first
      const argSuggestions = argTab(input, setInput);
      if (argSuggestions.length > 0) {
        if (argSuggestions.length === 1) {
          setInput(argSuggestions[0].command + " ");
          setShowSuggestions(false);
        } else {
          setSuggestions(argSuggestions);
          setShowSuggestions(true);
          setSelectedSuggestion(0);
        }
        return;
      }

      // Basic command autocomplete
      if (suggestions.length > 0) {
        setInput(suggestions[selectedSuggestion].command + " ");
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
    if (e.key === "ArrowUp" && !showSuggestions) {
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
    if (e.key === "ArrowDown" && !showSuggestions) {
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

    // Navigate suggestions with arrow keys when suggestions are visible
    if (showSuggestions) {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedSuggestion((prev) =>
          prev > 0 ? prev - 1 : suggestions.length - 1,
        );
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedSuggestion((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : 0,
        );
      } else if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        // Allow arrow keys to work in input when suggestions shown
        return;
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    setHistoryIndex(-1);

    // Generate basic suggestions
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
    const welcomeOutput = commands.welcome([]);
    setHistory([{ command: "", output: welcomeOutput, timestamp: new Date() }]);
  }, []);

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme }}>
      <div className="min-h-screen w-full bg-terminal-bg p-4 md:p-8 flex items-center justify-center">
        <div className="terminal-window w-full max-w-5xl h-[92vh] md:h-[88vh]">
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
                  <div className="output-line mb-2">{item.output}</div>
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
            </div>

            {/* Suggestions */}
            {showSuggestions && (
              <div className="suggestions">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={`${suggestion.command}-${index}`}
                    className={`suggestion-item ${
                      index === selectedSuggestion ? "selected" : ""
                    }`}
                    onClick={() => {
                      setInput(suggestion.command + " ");
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
    </ThemeContext.Provider>
  );
}
