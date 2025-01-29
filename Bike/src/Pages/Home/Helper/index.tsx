export const getCountValue = (status: string | null, CountsData: any) => {
    if (!CountsData) return 0;
  
    switch (status) {
      case "all":
        return Math.max(CountsData.stolen || 0, CountsData.non || 0);
      case "non":
        return CountsData.non || 0;
      case "stolen":
        return CountsData.stolen || 0;
      default:
        return CountsData.stolen || 0;
    }
  };
  