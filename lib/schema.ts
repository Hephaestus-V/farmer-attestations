export const SCHEMAS = {
    PRE_SOWING: {
      name: "PreSowingAttestation",
      schema: "address farmer, string soilFertilityReportHash, string landPreparationDetails, string weatherData, string cropTypeSelected, uint56 timestamp",
      uid: "0xfba8e38ec0f3b95fa87a0e9e4efb5bc84291f5e9198b7039d9506412730b4fa3" // Replace with actual schema UID after registration
    },
    MID_GROWTH: {
      name: "MidGrowthAttestation",
      schema: "address farmer, string growthStageReportHash, string pestDiseaseCheckHash, string waterFertilizerUsage, string weatherConditions, uint256 timestamp",
      uid: "0x..." // Replace with actual schema UID after registration
    },
    PRE_HARVEST: {
      name: "PreHarvestAttestation",
      schema: "address farmer, string cropMaturityIndicators, string yieldEstimationHash, string finalPestDiseaseStatus, string harvestPlanningDetails, uint256 timestamp",
      uid: "0x..." // Replace with actual schema UID after registration
    }
  }
  
  export type CheckpointType = keyof typeof SCHEMAS