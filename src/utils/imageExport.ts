import { toPng } from 'html-to-image';

/**
 * Exports a DOM element as a high-resolution PNG image
 * Preserves Arabic RTL typography, font family, and colors
 */
export async function exportElementAsPng(
  element: HTMLElement,
  fileName: string = 'zawqlist-library.png'
): Promise<{ success: boolean; error?: string }> {
  try {
    // Wait briefly to ensure fonts and images are ready
    await document.fonts?.ready;

    const dataUrl = await toPng(element, {
      quality: 0.95,
      pixelRatio: 2, // High resolution for crisp Arabic text rendering
      cacheBust: true,
      backgroundColor: '#FAF8F5',
      style: {
        direction: 'rtl',
        fontFamily: "'IBM Plex Sans Arabic', sans-serif"
      }
    });

    const link = document.createElement('a');
    link.download = fileName;
    link.href = dataUrl;
    link.click();

    return { success: true };
  } catch (err: any) {
    console.error('Failed to export image:', err);
    return { success: false, error: err?.message || 'فشل في تصدير الصورة' };
  }
}
