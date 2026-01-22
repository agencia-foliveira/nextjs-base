import { Inngest } from 'inngest';

export const inngest = new Inngest({
  id: 'next-starter',
  name: 'Next Starter Inngest',
  eventKey: process.env.INNGEST_EVENT_KEY!,
});
