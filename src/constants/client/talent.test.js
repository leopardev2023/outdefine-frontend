import messages from './talent';

test('has the correct talent_application message', () => {
  expect(messages.talent_application).toBe(
    'Keep track of your active job postings, and applicants. Once you find the right fit, schedule an interview. Visit your settings to set up auto messaging, this helps schedule more interviews in less time.'
  );
});
