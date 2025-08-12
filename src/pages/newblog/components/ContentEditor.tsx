import FroalaEditor from "react-froala-wysiwyg";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins.pkgd.min.js";

interface ContentEditorProps {
  content: string;
  onContentChange: (content: string) => void;
}

const ContentEditor = ({ content, onContentChange }: ContentEditorProps) => {
  const config = {
    height: 350,
    width: "100%",
    placeholderText: "Enter Blog Content Here....",
  };

  return (
    <FroalaEditor
      tag="textarea"
      config={config}
      model={content}
      onModelChange={onContentChange}
    />
  );
};

export default ContentEditor;
