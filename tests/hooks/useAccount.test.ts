import { describe, it, expect } from 'vitest';
import { useAccount } from '@/hooks/useAccount';
import { renderHook } from '@testing-library/react-hooks';

describe('useAccount', () => {
    it('returns the current user object', () => {
        const { result } = renderHook(() => useAccount());

        expect(result.current.user).toBeDefined();
        expect(result.current.user.email).toBe('example@example.com');
    });
});
