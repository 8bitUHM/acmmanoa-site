import * as React from 'react';

export interface AccordionItem {
  question: string;
  answer: string;
}

/**
 * FAQ accordion — rounded cards with a blue help icon and rotating chevron.
 * @startingPoint section="Feedback" subtitle="FAQ accordion list" viewport="700x360"
 */
export interface AccordionProps {
  items: AccordionItem[];
  /** Index open on mount, -1 for all closed. @default -1 */
  defaultOpen?: number;
  /** Allow multiple panels open at once. @default false */
  allowMultiple?: boolean;
  style?: React.CSSProperties;
}

export function Accordion(props: AccordionProps): JSX.Element;
