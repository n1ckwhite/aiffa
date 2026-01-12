export type ProfileHeaderEditFormProps = {
    editSessionId: number;
    saveAction: (formData: FormData) => void;
    initialName: string;
    initialBio: string;
    formBorder: string;
    formBg: string;
    handleStopHotkeys: (e: KeyboardEvent) => void;
  };