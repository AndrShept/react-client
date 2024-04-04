import { EyeIcon, EyeOffIcon } from 'lucide-react';

interface EyeIconFormPops {
  isShow: boolean;
  setIsShow: () => void;
}

export const EyeIconForm = ({ isShow, setIsShow }: EyeIconFormPops) => {
  return (
    <>
      {!isShow && (
        <EyeIcon
          onClick={setIsShow}
          className="absolute cursor-pointer transition top-[10px] text-muted-foreground hover:text-primary right-2 size-[19px]"
        />
      )}
      {isShow && (
        <EyeOffIcon
          onClick={setIsShow}
          className="absolute cursor-pointer transition top-[10px] text-muted-foreground hover:text-primary right-2 size-[19px]"
        />
      )}
    </>
  );
};
