export async function translateWithGoogle(text, targetLang = "es") {
    try {
      const response = await fetch(
        `https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=auto&tl=${targetLang}&q=${encodeURIComponent(text)}`
      );
  
      const data = await response.json();
      return data[0]?.[0] || text; // Return original text if translation fails or is void
    } catch (error) {
      console.error("Error al traducir con Google:", error);
      return text;
    }
  }
  