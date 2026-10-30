import { describe, it, expect } from 'vitest';
import {
  validateAnswer,
  caesarDecode,
  caesarEncode,
  getPuzzle,
  PUZZLES,
} from '../engine/puzzles';

describe('Puzzle Engine', () => {
  describe('Caesar cipher', () => {
    it('decodes with shift 7', () => {
      // SPTPUHS decoded with shift 7 → LIMINAL
      expect(caesarDecode('SPTPUHS', 7)).toBe('LIMINAL');
    });

    it('encodes with shift 7', () => {
      expect(caesarEncode('LIMINAL', 7)).toBe('SPTPUHS');
    });

    it('is self-consistent', () => {
      const original = 'HELLOWORLD';
      expect(caesarDecode(caesarEncode(original, 7), 7)).toBe(original);
    });

    it('handles lowercase', () => {
      expect(caesarDecode('sptpuhs', 7)).toBe('liminal');
    });

    it('preserves non-alpha characters', () => {
      expect(caesarDecode('SPTPUHS!', 7)).toBe('LIMINAL!');
    });
  });

  describe('validateAnswer', () => {
    it('returns true for correct caesar cipher answer', () => {
      expect(validateAnswer('caesar_cipher', 'LIMINAL')).toBe(true);
      expect(validateAnswer('caesar_cipher', 'liminal')).toBe(true);
      expect(validateAnswer('caesar_cipher', ' liminal ')).toBe(true);
    });

    it('returns false for wrong caesar cipher answer', () => {
      expect(validateAnswer('caesar_cipher', 'SPTPUHS')).toBe(false);
      expect(validateAnswer('caesar_cipher', 'wrong')).toBe(false);
    });

    it('returns true for correct word pattern answer', () => {
      expect(validateAnswer('word_pattern', 'BELOWTHESURFACE')).toBe(true);
      expect(validateAnswer('word_pattern', 'below the surface')).toBe(true);
      expect(validateAnswer('word_pattern', 'below the  surface')).toBe(true);
    });

    it('returns false for wrong word pattern answer', () => {
      expect(validateAnswer('word_pattern', 'belowsurface')).toBe(false);
      expect(validateAnswer('word_pattern', 'above the surface')).toBe(false);
    });

    it('returns true for correct coordinate code', () => {
      expect(validateAnswer('coordinate_code', '471109')).toBe(true);
    });

    it('returns false for wrong coordinate code', () => {
      expect(validateAnswer('coordinate_code', '111047')).toBe(false);
      expect(validateAnswer('coordinate_code', '123456')).toBe(false);
    });

    it('returns false for unknown puzzle id', () => {
      expect(validateAnswer('nonexistent_puzzle', 'anything')).toBe(false);
    });
  });

  describe('PUZZLES registry', () => {
    it('has exactly 3 puzzles', () => {
      expect(PUZZLES).toHaveLength(3);
    });

    it('each puzzle has required fields', () => {
      PUZZLES.forEach(p => {
        expect(p.id).toBeTruthy();
        expect(p.name).toBeTruthy();
        expect(p.answer).toBeTruthy();
        expect(p.unlocks).toBeTruthy();
        expect(p.type).toBeTruthy();
      });
    });

    it('getPuzzle returns the correct puzzle', () => {
      const p = getPuzzle('caesar_cipher');
      expect(p?.name).toBe('The Encoded Transmission');
    });

    it('getPuzzle returns undefined for unknown id', () => {
      expect(getPuzzle('does_not_exist')).toBeUndefined();
    });

    it('puzzles unlock the expected pages', () => {
      expect(getPuzzle('caesar_cipher')?.unlocks).toBe('valdris://restricted');
      expect(getPuzzle('word_pattern')?.unlocks).toBe('valdris://final-message');
      expect(getPuzzle('coordinate_code')?.unlocks).toBe('endpoint://the-endpoint');
    });
  });
});
