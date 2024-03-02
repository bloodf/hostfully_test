import { describe, it, expect, vi } from 'vitest';
import {generateUUID} from "../../src/helpers/uuid";

vi.stubGlobal('crypto', {
    randomUUID: vi.fn(() => 'mocked-uuid'),
});

describe('generateUUID', () => {
    it('should return a string', () => {
        const uuid = generateUUID();
        expect(typeof uuid).toBe('string');
    });

    it('should return a valid UUID format', () => {
        const uuid = generateUUID();
        expect(uuid).toMatch('mocked-uuid');
    });

    it('should call crypto.randomUUID', () => {
        generateUUID();
        expect(crypto.randomUUID).toHaveBeenCalled();
    });
});
