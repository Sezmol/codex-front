import { CreatePortfolioItemSchema } from "@/validations/schemas/createPortfolioItemSchema";

export interface UpdatePortfolioItemVariables {
  id: string;
  data: CreatePortfolioItemSchema;
}
