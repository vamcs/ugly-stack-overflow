import Axios from "axios";

export const axios = Axios.create({
  baseURL: "https://api.stackexchange.com/2.2/",
});

export interface ShallowUser {
  accept_rate?: number;
  display_name?: string;
  link?: string;
  profile_image?: string;
  reputation?: number;
  user_id?: number;
  user_type:
    | "unregistered"
    | "registered"
    | "moderator"
    | "team_admin"
    | "does_not_exist";
}

export interface Question {
  accepted_answer_id?: number;
  answer_count: number;
  bounty_amount?: number;
  /**
   * Unix epoch date string
   */
  bounty_closes_date?: string;
  /**
   * Unix epoch date string
   */
  closed_date?: string;
  closed_reason?: string;
  /**
   * Unix epoch date string
   */
  community_owned_date?: string;
  content_license: string;
  /**
   * Unix epoch date string
   */
  creation_date: string;
  is_answered: boolean;
  /**
   * Unix epoch date string
   */
  last_activity_date: string;
  /**
   * Unix epoch date string
   */
  last_edit_date?: string;
  link: string;
  /**
   * Unix epoch date string
   */
  locked_date?: string;
  // migrated_from?: migration_info // complex object that is not needed!
  // migrated_to?: migration_info // not needed either!
  owner?: ShallowUser;
  /**
   * Unix epoch date string
   */
  protected_date?: string;
  question_id: number;
  score: number;
  tags: string[];
  title: string;
  view_count: number;
}

export interface ApiResponse<T> {
  items: T[];
  has_more: boolean;
  quota_max: number;
  quota_remaining: number;
}

export function convertLocaleStringDate(timestamp: string) {
  return new Date(Number(timestamp) * 1000).toLocaleString();
}
