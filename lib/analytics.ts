/**
 * Analytics utility for Google Analytics (GA4)
 */

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category?: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Common tracking methods for user behavior
export const trackUserBehavior = {
  // Track button clicks
  trackClick: (label: string, category: string = 'engagement') => {
    event({
      action: 'click',
      category,
      label,
    });
  },

  // Track form submissions
  trackFormSubmit: (formName: string) => {
    event({
      action: 'form_submission',
      category: 'conversion',
      label: formName,
    });
  },

  // Track sections viewed
  trackSectionView: (sectionId: string) => {
    event({
      action: 'section_view',
      category: 'engagement',
      label: sectionId,
    });
  },
};

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string,
      config?: ControlParams | EventParams | ConfigParams | CustomParams
    ) => void;
  }
}

// Minimal types for gtag
interface ControlParams {
  groups?: string | string[];
  send_to?: string | string[];
  event_callback?: () => void;
  event_timeout?: number;
}

interface EventParams {
  checkout_option?: string;
  checkout_step?: number;
  content_id?: string;
  content_type?: string;
  coupon?: string;
  currency?: string;
  description?: string;
  fatal?: boolean;
  items?: any[];
  method?: string;
  number?: string;
  page_title?: string;
  page_location?: string;
  page_path?: string;
  promotion_id?: string;
  promotion_name?: string;
  screen_name?: string;
  search_term?: string;
  shipping?: number;
  tax?: number;
  transaction_id?: string;
  value?: number;
  event_category?: string;
  event_label?: string;
  non_interaction?: boolean;
  [key: string]: any;
}

interface ConfigParams {
  page_title?: string;
  page_location?: string;
  page_path?: string;
  send_page_view?: boolean;
  [key: string]: any;
}

interface CustomParams {
  [key: string]: any;
}
