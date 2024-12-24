import { describe, it, expect, vi } from 'vitest';
import { getUniqueId, SaveData, dateInAgoFormat } from '../../src/lib/helpers';
import { v4 as uuidv4 } from 'uuid';
import { JSDOM } from "jsdom";

vi.mock('uuid', () => ({
    v4: vi.fn(() => 'unique-id')
}));

describe('getUniqueId', () => {
    it('should return a unique id', () => {
        const id = getUniqueId();
        expect(id).toBe('unique-id');
        expect(uuidv4).toHaveBeenCalled();
    });
});

describe('SaveData', () => {
    it('should create a blob and trigger a download', () => {
        const dom = new JSDOM();
        global.document = dom.window.document;
        global.window = dom.window;
        global.URL.createObjectURL = vi.fn();
        global.window.URL.revokeObjectURL = vi.fn();
        const createElementSpy = vi.spyOn(document, 'createElement');
        const createObjectURLSpy = vi.spyOn(global.URL, 'createObjectURL').mockReturnValue('blob-url');
        const revokeObjectURLSpy = vi.spyOn(global.window.URL, 'revokeObjectURL');
        const clickSpy = vi.fn();

        createElementSpy.mockReturnValue({
            href: '',
            download: '',
            click: clickSpy
        } as unknown as HTMLAnchorElement);

        SaveData('test.json', '{"key":"value"}');

        expect(createElementSpy).toHaveBeenCalledWith('a');
        expect(createObjectURLSpy).toHaveBeenCalled();
        expect(clickSpy).toHaveBeenCalled();
        expect(revokeObjectURLSpy).toHaveBeenCalledWith('blob-url');
    });
});

describe('dateInAgoFormat', () => {
    const now = new Date().getTime();

    it('should return "years ago" format', () => {
        expect(dateInAgoFormat(now - 2 * 31536000000)).toBe('2 years ago');
    });

    it('should return "months ago" format', () => {
        expect(dateInAgoFormat(now - 3 * 2592000000)).toBe('3 months ago');
    });

    it('should return "days ago" format', () => {
        expect(dateInAgoFormat(now - 4 * 86400000)).toBe('4 days ago');
    });

    it('should return "hours ago" format', () => {
        expect(dateInAgoFormat(now - 5 * 3600000)).toBe('5 hours ago');
    });

    it('should return "minutes ago" format', () => {
        expect(dateInAgoFormat(now - 6 * 60000)).toBe('6 minutes ago');
    });

    it('should return "seconds ago" format', () => {
        expect(dateInAgoFormat(now - 7 * 1000)).toBe('7 seconds ago');
    });
});