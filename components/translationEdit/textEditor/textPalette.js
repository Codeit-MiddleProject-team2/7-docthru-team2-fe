const COLORS = [
  '#000000', 
  '#6C757D', 
  '#E57373',
  '#81C784', 
  '#64B5F6', 
  '#FFB74D', 
  '#9575CD',
];

function TextPalette({ editor, onClose }) {
  if (!editor) return null;

  return (
    <div
      style={{
      position: 'fixed', 
      top: '50px',
      left: '50%',
      transform: 'translateX(-95%)', 
      zIndex: 9999, 
      background: '#fff',
      border: '1px solid #ccc',
      padding: '8px',
      display: 'flex',
      gap: '4px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        width:'200px',
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
