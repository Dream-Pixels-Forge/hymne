import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSettings } from '../useSettings';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('useSettings', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  it('should return default settings when no saved settings exist', () => {
    const { result } = renderHook(() => useSettings());

    expect(result.current.settings).toEqual({
      apiKey: '',
      model: 'gemini-3.1-pro-preview',
    });
  });

  it('should load saved settings from localStorage on initialization', () => {
    const savedSettings = {
      apiKey: 'test-api-key-123',
      model: 'gemini-3-flash-preview',
    };
    localStorageMock.getItem.mockReturnValue(JSON.stringify(savedSettings));

    const { result } = renderHook(() => useSettings());

    expect(result.current.settings).toEqual(savedSettings);
    expect(localStorageMock.getItem).toHaveBeenCalledWith('hymne_settings');
  });

  it('should save settings to localStorage when updated', () => {
    const { result } = renderHook(() => useSettings());

    const newSettings = {
      apiKey: 'new-api-key-456',
      model: 'gemini-3.0-pro-preview',
    };

    act(() => {
      result.current.setSettings(newSettings);
    });

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'hymne_settings',
      JSON.stringify(newSettings)
    );
    expect(result.current.settings).toEqual(newSettings);
  });

  it('should update apiKey when setSettings is called with partial settings', () => {
    const { result } = renderHook(() => useSettings());

    act(() => {
      result.current.setSettings({
        apiKey: 'updated-key',
        model: 'gemini-3.1-pro-preview',
      });
    });

    expect(result.current.settings.apiKey).toBe('updated-key');
  });

  it('should update model when setSettings is called', () => {
    const { result } = renderHook(() => useSettings());

    act(() => {
      result.current.setSettings({
        apiKey: '',
        model: 'gemini-2.5-flash',
      });
    });

    expect(result.current.settings.model).toBe('gemini-2.5-flash');
  });

  it('should persist settings across multiple hook instances', () => {
    localStorageMock.clear();

    const settings1 = {
      apiKey: 'persist-test-key',
      model: 'gemini-3.1-pro-preview',
    };

    // First hook instance saves settings
    const { result: result1 } = renderHook(() => useSettings());
    act(() => {
      result1.current.setSettings(settings1);
    });

    // Mock the localStorage to return the saved settings
    localStorageMock.getItem.mockReturnValue(JSON.stringify(settings1));

    // Second hook instance should load the same settings
    const { result: result2 } = renderHook(() => useSettings());
    expect(result2.current.settings).toEqual(settings1);
  });

  it('should handle invalid JSON in localStorage gracefully and use defaults', () => {
    localStorageMock.getItem.mockReturnValue('invalid-json');

    const { result } = renderHook(() => useSettings());

    // Should use default settings when JSON is invalid
    expect(result.current.settings).toEqual({
      apiKey: '',
      model: 'gemini-3.1-pro-preview',
    });

    // Should have cleared the invalid settings
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('hymne_settings');
  });
});
