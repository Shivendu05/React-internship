import { useState } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Modal,
  ModalFooter,
  Input,
  Select,
  Alert,
} from './components';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(true);

  const selectOptions = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
  ];

  return (
    <div className="app">
      <header className="app__header">
        <h1>UI Component Library</h1>
        <p>A collection of reusable, accessible React components</p>
      </header>

      <main className="app__main">
        {/* Buttons Section */}
        <section className="section">
          <h2>Buttons</h2>
          <div className="component-grid">
            <div className="demo-group">
              <h3>Variants</h3>
              <div className="button-row">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
              </div>
            </div>

            <div className="demo-group">
              <h3>Sizes</h3>
              <div className="button-row">
                <Button size="small">Small</Button>
                <Button size="medium">Medium</Button>
                <Button size="large">Large</Button>
              </div>
            </div>

            <div className="demo-group">
              <h3>States</h3>
              <div className="button-row">
                <Button disabled>Disabled</Button>
                <Button loading>Loading</Button>
                <Button fullWidth>Full Width</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Cards Section */}
        <section className="section">
          <h2>Cards</h2>
          <div className="card-grid">
            <Card variant="default" hoverable>
              <CardHeader>
                <h3>Default Card</h3>
              </CardHeader>
              <CardBody>
                This is a default card with a subtle border. It has a hover effect enabled.
              </CardBody>
              <CardFooter align="right">
                <Button variant="ghost" size="small">Cancel</Button>
                <Button size="small">Action</Button>
              </CardFooter>
            </Card>

            <Card variant="elevated">
              <CardHeader>
                <h3>Elevated Card</h3>
              </CardHeader>
              <CardBody>
                This card has a shadow elevation that makes it stand out from the background.
              </CardBody>
              <CardFooter>
                <Button variant="outline" size="small">Learn More</Button>
              </CardFooter>
            </Card>

            <Card variant="outlined" padding="large">
              <CardHeader>
                <h3>Outlined Card</h3>
              </CardHeader>
              <CardBody>
                An outlined variant with larger padding for more spacious content.
              </CardBody>
            </Card>
          </div>
        </section>

        {/* Alerts Section */}
        <section className="section">
          <h2>Alerts</h2>
          <div className="alert-stack">
            <Alert type="info" title="Information">
              This is an informational alert message.
            </Alert>
            <Alert type="success" title="Success">
              Your changes have been saved successfully.
            </Alert>
            <Alert type="warning" title="Warning">
              Please review your input before proceeding.
            </Alert>
            {showAlert && (
              <Alert type="error" title="Error" dismissible onDismiss={() => setShowAlert(false)}>
                Something went wrong. Please try again.
              </Alert>
            )}
            <Alert type="info" variant="filled">
              Filled variant alert message.
            </Alert>
            <Alert type="success" variant="outlined">
              Outlined variant alert message.
            </Alert>
          </div>
        </section>

        {/* Form Components Section */}
        <section className="section">
          <h2>Form Components</h2>
          <div className="form-demo">
            <div className="form-row">
              <Input
                label="Username"
                placeholder="Enter your username"
                helperText="Choose a unique username"
              />
              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-row">
              <Input
                label="Password"
                type="password"
                placeholder="Enter password"
                error="Password must be at least 8 characters"
              />
              <Input
                label="Disabled Input"
                placeholder="Cannot edit"
                disabled
              />
            </div>
            <div className="form-row">
              <Select
                label="Framework"
                options={selectOptions}
                placeholder="Select a framework"
                helperText="Choose your preferred framework"
              />
              <Select
                label="Required Select"
                options={selectOptions}
                placeholder="Select option"
                required
                error="This field is required"
              />
            </div>
            <div className="form-row">
              <Input
                label="Filled Variant"
                variant="filled"
                placeholder="Filled input style"
              />
              <Select
                label="Filled Select"
                variant="filled"
                options={selectOptions}
                placeholder="Filled select style"
              />
            </div>
          </div>
        </section>

        {/* Modal Section */}
        <section className="section">
          <h2>Modal</h2>
          <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Modal Title"
            size="medium"
          >
            <p>
              This is a modal dialog with accessibility features including:
            </p>
            <ul>
              <li>Focus trap within the modal</li>
              <li>Escape key to close</li>
              <li>Click outside to close</li>
              <li>ARIA attributes for screen readers</li>
            </ul>
            <ModalFooter>
              <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsModalOpen(false)}>
                Confirm
              </Button>
            </ModalFooter>
          </Modal>
        </section>
      </main>

      <footer className="app__footer">
        <p>UI Component Library - Week 2 Task</p>
      </footer>
    </div>
  );
}

export default App;
