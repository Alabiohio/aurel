export interface WebGLCapabilities {
  supported: boolean;
  isSoftwareGl: boolean;
}

export function detectWebGLCapabilities(): WebGLCapabilities {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return {
      supported: false,
      isSoftwareGl: false,
    };
  }

  try {
    const probeCanvas = document.createElement('canvas');
    const gl =
      (probeCanvas.getContext('webgl2') as WebGL2RenderingContext | null) ||
      (probeCanvas.getContext('webgl') as WebGLRenderingContext | null);

    if (!gl) {
      return {
        supported: false,
        isSoftwareGl: false,
      };
    }

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    const rendererParam = debugInfo ? debugInfo.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpuRenderer = String(gl.getParameter(rendererParam) || '');

    // Immediately free probe context
    gl.getExtension('WEBGL_lose_context')?.loseContext();

    const isSoftwareGl = /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(
      gpuRenderer
    );

    return {
      supported: true,
      isSoftwareGl,
    };
  } catch {
    return {
      supported: false,
      isSoftwareGl: false,
    };
  }
}
