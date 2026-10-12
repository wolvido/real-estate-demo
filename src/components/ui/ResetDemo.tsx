import { useState } from 'react';
import { useDemo } from '../../app/DemoProvider';
import { Button } from './Button';
import { Dialog } from './Dialog';
export function ResetDemo() {
  const [open, setOpen] = useState(false); const [done, setDone] = useState(false); const { resetDemo } = useDemo();
  return <><button type="button" className="text-link" onClick={() => { setOpen(true); setDone(false); }}>Reset demo</button>{done && <span role="status">Demo reset.</span>}<Dialog open={open} onClose={() => setOpen(false)} title="Reset the demo?"><p>Restore the original sample listings and inquiries, and clear this demo’s changes on this device.</p><div className="action-row"><Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={() => { resetDemo(); setDone(true); setOpen(false); }}>Reset demo</Button></div></Dialog></>;
}
