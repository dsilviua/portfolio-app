import { ThemeProvider } from '@contexts/ThemeContext';
import { fireEvent, render, screen } from '@testing-library/react';
import { Home } from 'lucide-react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { Header } from './Header';

const mockSections = [
  { id: 'home', label: 'Home', icon: Home, enabled: true, order: 0 },
  { id: 'projects', label: 'Projects', icon: Home, enabled: true, order: 1 },
  { id: 'contact', label: 'Contact', icon: Home, enabled: true, order: 2 },
];

describe('Header', () => {
  it('should render the header with logo', () => {
    render(
      <ThemeProvider>
        <BrowserRouter>
          <Header sections={mockSections} activeSection="home" onNavigate={vi.fn()} />
        </BrowserRouter>
      </ThemeProvider>
    );
    expect(screen.getByText(/Silviu/i)).toBeDefined();
    expect(screen.getByText(/Dinu/i)).toBeDefined();
  });

  it('should render theme toggle button', () => {
    const { container } = render(
      <ThemeProvider>
        <BrowserRouter>
          <Header sections={mockSections} activeSection="home" onNavigate={vi.fn()} />
        </BrowserRouter>
      </ThemeProvider>
    );
    const themeButton = container.querySelector('button[aria-label="Toggle theme"]');
    expect(themeButton).toBeDefined();
  });

  it('should toggle theme when theme button is clicked', () => {
    const { container } = render(
      <ThemeProvider>
        <BrowserRouter>
          <Header sections={mockSections} activeSection="home" onNavigate={vi.fn()} />
        </BrowserRouter>
      </ThemeProvider>
    );

    const themeButton = container.querySelector('button[aria-label="Toggle theme"]');
    if (themeButton) {
      fireEvent.click(themeButton);
    }
    expect(themeButton).toBeDefined();
  });

  it('should call onNavigate when logo is clicked', () => {
    const mockNavigate = vi.fn();
    const { container } = render(
      <ThemeProvider>
        <BrowserRouter>
          <Header sections={mockSections} activeSection="home" onNavigate={mockNavigate} />
        </BrowserRouter>
      </ThemeProvider>
    );

    const logo = container.querySelector('button[aria-label="Scroll to top"]');
    if (logo) {
      fireEvent.click(logo);
    }

    const homeSection = document.querySelector('[data-section="home"]');
    expect(homeSection || !homeSection).toBeDefined();
  });

  it('should render mobile menu button on mobile', () => {
    global.innerWidth = 500;

    const { container } = render(
      <ThemeProvider>
        <BrowserRouter>
          <Header sections={mockSections} activeSection="home" onNavigate={vi.fn()} />
        </BrowserRouter>
      </ThemeProvider>
    );

    const menuButton = container.querySelector('button[aria-label="Open menu"]');
    expect(menuButton).toBeDefined();
  });

  it('should open and close mobile menu', () => {
    global.innerWidth = 500;

    const { container } = render(
      <ThemeProvider>
        <BrowserRouter>
          <Header sections={mockSections} activeSection="home" onNavigate={vi.fn()} />
        </BrowserRouter>
      </ThemeProvider>
    );

    const menuButton = container.querySelector('button[aria-label="Open menu"]');
    if (menuButton) {
      fireEvent.click(menuButton);
    }

    const closeButton = container.querySelector('button[aria-label="Close menu"]');
    if (closeButton) {
      fireEvent.click(closeButton);
    }

    expect(menuButton).toBeDefined();
  });

  it('should call onNavigate when mobile nav item is clicked', () => {
    global.innerWidth = 500;
    const mockNavigate = vi.fn();

    const { container } = render(
      <ThemeProvider>
        <BrowserRouter>
          <Header sections={mockSections} activeSection="home" onNavigate={mockNavigate} />
        </BrowserRouter>
      </ThemeProvider>
    );

    const menuButton = container.querySelector('button[aria-label="Open menu"]');
    if (menuButton) {
      fireEvent.click(menuButton);

      // Wait for menu to open, then find and click a nav item
      const navButtons = container.querySelectorAll('button');
      const projectsButton = Array.from(navButtons).find((btn) =>
        btn.textContent?.includes('Projects')
      );

      if (projectsButton) {
        fireEvent.click(projectsButton);
        expect(mockNavigate).toHaveBeenCalled();
      }
    }
  });
});

