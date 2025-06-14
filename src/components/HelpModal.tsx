import { useCallback } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function HelpModal({ isOpen, onClose }: Props) {
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg p-6 max-w-[640px] max-h-[80vh] m-8 overflow-y-auto space-y-4 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Just Pato</h2>
        <p>ボタンを押すたびに、50%の確率でパトランプが光ります。</p>
        <p>連続で当たるごとに、7セグの数字が増えていきます。一度でも外れたら0からやり直し。</p>
        <h3 className="text-lg font-bold mb-4">演出モード</h3>
        <p>画面上部の演出モード選択UIから、演出モードを選択できます。</p>
        <ul className="list-disc pl-5">
          <li><strong>ノーマルモード:</strong> バランスよく演出が発生するモードです。</li>
          <li><strong>シンプルモード:</strong> 違和感一切なし・ボタンを離した瞬間の後告知のみのモード。</li>
          <li><strong>先告知モード:</strong> 違和感一切なし・ほとんどが先告知となるモード。</li>
          <li><strong>違和感モード:</strong> 違和感割合が大幅に増加するモード。</li>
        </ul>
      </div>
    </div>
  );
}
