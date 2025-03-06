import { ThemeProvider } from '@modern-design-system/theme';
import { Button } from '@modern-design-system/components';

function App() {
  return (
    <ThemeProvider>
      <h1>Storybook</h1>
      <Button variant="text">Button text</Button>
      <br />
      <Button variant="primary">Button primary</Button>
      <br />
      <Button variant="primary" disabled>
        Button Disabled
      </Button>
      <br />
      <Button variant="secondary" loading>
        Button secondary
      </Button>
      <br />
      <Button variant="outline">Button outlined</Button>
    </ThemeProvider>
  );
}

export default App;
