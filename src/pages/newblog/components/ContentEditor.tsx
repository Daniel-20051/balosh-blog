import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

type ContentEditorProps = {
  value: string;
  onChange: (html: string) => void;
};

const ContentEditor = ({ value, onChange }: ContentEditorProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    // Instantiate once
    if (!quillRef.current && containerRef.current) {
      quillRef.current = new Quill(containerRef.current, {
        theme: "snow",
        placeholder: "Write your post...",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline"],
            ["link"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ align: [] }],
          ],
        },
      });

      // Apply initial value if provided
      if (value) {
        const delta = quillRef.current.clipboard.convert({ html: value });
        quillRef.current.setContents(delta, "silent");
      }
    }

    // Always attach listener (handles React Strict Mode double-effect)
    const editor = quillRef.current!;
    const handleChange = () => {
      const html =
        (editor as any)?.getSemanticHTML?.() ||
        (editor as any)?.root?.innerHTML ||
        "";
      onChange(html);
    };
    editor.on("text-change", handleChange);
    return () => {
      editor.off("text-change", handleChange);
    };
  }, []);

  // Keep editor in sync when external value changes
  useEffect(() => {
    if (!quillRef.current) return;
    const currentHtml =
      (quillRef.current as any)?.getSemanticHTML?.() ||
      (quillRef.current as any)?.root?.innerHTML ||
      "";
    if (value !== currentHtml) {
      const delta = quillRef.current.clipboard.convert({ html: value || "" });
      quillRef.current.setContents(delta, "silent");
    }
  }, [value]);

  return (
    <div className="bg-white border border-gray-200 rounded-lg">
      <div
        ref={containerRef}
        className="min-h-[300px]"
        data-testid="content-editor"
      />
    </div>
  );
};

export default ContentEditor;
