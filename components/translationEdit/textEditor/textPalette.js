const COLORS = [
  '#000000', 
  '#6C757D', 
  '#E57373',
  '#FFB74D', 
  '#81C784', 
  '#64B5F6', 
  '#9575CD',
];

function TextPalette({ editor, onClose }) {
  if (!editor) return null;

  return (
    <div
      style={{
      position: 'fixed',
      zIndex: 9999, 
      background: '#fff',
      border: '1px solid',
      padding: '8px',
      display: 'flex',
      gap: '4px',
      width:'200px',
      margin:'0px 20px',
      }}
    >
      {COLORS.map((color) => (
        <button
          key={color}
          onClick={() => {
            editor.chain().focus().setColor(color).run();
            onClose?.(); 
          }}
          style={{
            backgroundColor: color,
            width: '24px',
            height: '24px',
            border: '1px solid #ccc',
            cursor: 'pointer',
          }}
        />
      ))}
    </div>
  );
}

export default TextPalette;
