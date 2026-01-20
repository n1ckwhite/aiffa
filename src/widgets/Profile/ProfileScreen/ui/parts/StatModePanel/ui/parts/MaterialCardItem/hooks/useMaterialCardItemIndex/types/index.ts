export type UseMaterialCardItemIndexArgs = {
    listIndex?: number;
    isCompletedMaterial: boolean;
  };
  
export type UseMaterialCardItemIndexResult = {
    showIndexChip: boolean;
    showIndexNumber: boolean;
    indexLabel: number | null;
};