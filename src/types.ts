export interface StockData {
  index_name: string;
  index_date: string;
  open_index_value: number;
  high_index_value: number;
  low_index_value: number;
  closing_index_value: number;
  points_change: number;
  change_percent: number;
  volume: number;
  turnover_rs_cr: number;
  pe_ratio: number;
  pb_ratio: number;
  div_yield: number;
}