import {
  FiCode,
  FiLayers,
  FiShoppingCart,
  FiSmartphone,
  FiSearch,
  FiShield,
  FiTrendingUp,
  FiPenTool,
  FiDatabase,
  FiHeadphones,
} from "react-icons/fi";

// Admin will pick one of these keys when creating a Service.
// Frontend maps the string key back to the actual icon component.
export const ICON_MAP = {
  code: FiCode,
  layers: FiLayers,
  cart: FiShoppingCart,
  mobile: FiSmartphone,
  seo: FiSearch,
  shield: FiShield,
  growth: FiTrendingUp,
  design: FiPenTool,
  database: FiDatabase,
  support: FiHeadphones,
};

export function getIconComponent(key) {
  return ICON_MAP[key] || FiCode;
}