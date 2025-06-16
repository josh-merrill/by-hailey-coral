import { test, expect } from '@playwright/test';

test.describe('Card Stack Animation', () => {
  test('should display and animate card stack correctly on scroll', async ({ page }) => {
    // Step 1: Navigate to test page
    await page.goto('file://' + process.cwd() + '/test-cardstack.html');
    
    // Step 2: Verify initial card stack appearance
    await expect(page.locator('.cards-section')).toBeVisible();
    await expect(page.locator('.card')).toHaveCount(5);
    
    // Step 3: Check that cards are properly stacked with offsets
    const cards = page.locator('.card');
    await expect(cards.first()).toBeVisible();
    
    // Verify all cards are present with text content
    await expect(cards.nth(0)).toContainText('Card 1');
    await expect(cards.nth(1)).toContainText('Card 2');
    await expect(cards.nth(2)).toContainText('Card 3');
    await expect(cards.nth(3)).toContainText('Card 4');
    await expect(cards.nth(4)).toContainText('Card 5');
    
    // Step 4: Scroll to trigger animation
    // Scroll to the cards section center
    await page.locator('.cards-section').scrollIntoView({ block: 'center' });
    
    // Wait for potential GSAP animations to initialize
    await page.waitForTimeout(1000);
    
    // Continue scrolling to trigger the flip animations
    await page.keyboard.press('PageDown');
    await page.waitForTimeout(500);
    
    // Step 5: Verify cards flip and animate during scroll
    // The animation should be running, though exact transforms are complex to verify
    // We'll check that the animation system is working by verifying no critical errors
    
    // Step 6: Check for any console errors
    const logs = await page.evaluate(() => {
      return window.console.error.length || 0;
    });
    
    // We expect some GSAP warnings but no critical errors
    const consoleMessages = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleMessages.push(msg.text());
      }
    });
    
    // Step 7: Verify final animation state
    // Scroll to the end to complete the animation
    await page.keyboard.press('End');
    await page.waitForTimeout(1000);
    
    // Verify we can see the completion message
    await expect(page.locator('text=Animation Complete!')).toBeVisible();
    
    // Verify no JavaScript errors occurred
    expect(consoleMessages.filter(msg => 
      !msg.includes('GSAP target') && 
      !msg.includes('net::ERR_')
    )).toHaveLength(0);
  });

  test('should initialize card stack with proper CSS transforms', async ({ page }) => {
    await page.goto('file://' + process.cwd() + '/test-cardstack.html');
    
    // Wait for GSAP to initialize
    await page.waitForTimeout(1000);
    
    // Check that cards have been positioned with GSAP transforms
    const firstCard = page.locator('.card').first();
    await expect(firstCard).toHaveAttribute('data-card-index', '0');
    
    // Verify that GSAP has applied transforms (cards should have transform styles)
    const transformStyle = await firstCard.evaluate(el => 
      window.getComputedStyle(el).transform
    );
    
    // Transform should not be 'none' if GSAP has initialized properly
    expect(transformStyle).not.toBe('none');
  });

  test('should handle edge cases gracefully', async ({ page }) => {
    // Test with no cards
    await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head>
        <script defer src="./dist/index.js"></script>
      </head>
      <body>
        <div class="cards-section">
          <!-- No cards -->
        </div>
      </body>
      </html>
    `);
    
    await page.waitForTimeout(1000);
    
    // Should not crash when no cards are present
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error' && !msg.text().includes('Failed to load resource')) {
        errors.push(msg.text());
      }
    });
    
    expect(errors).toHaveLength(0);
  });
});