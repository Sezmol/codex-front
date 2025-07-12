import { CreatePortfolioItemSchema } from "@/shared/validations/schemas/createPortfolioItemSchema";

export interface UpdatePortfolioItemVariables {
  id: string;
  data: CreatePortfolioItemSchema;
}
