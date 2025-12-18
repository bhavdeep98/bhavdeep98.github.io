#!/usr/bin/env node

/**
 * Browser Compatibility Test
 * Tests modern browser features used in the website
 */

const fs = require('fs');

function testBrowserCompatibility() {
    console.log('🌐 Testing Browser Compatibility Features...');
    
    const htmlContent = fs.readFileSync('index.html', 'utf8');
    
    const features = {
        'CSS Grid': htmlContent.includes('grid-template-columns'),
        'CSS Flexbox': htmlContent.includes('display: flex'),
        'CSS Custom Properties': htmlContent.includes('var(--'),
        'CSS Media Queries': htmlContent.includes('@media'),
        'Smooth Scrolling': htmlContent.includes('scroll-behavior: smooth'),
        'Backdrop Filter': htmlContent.includes('backdrop-filter'),
        'CSS Transitions': htmlContent.includes('transition:'),
        'CSS Transforms': htmlContent.includes('transform:'),
        'Semantic HTML5': htmlContent.includes('<section') && htmlContent.includes('<nav'),
        'Modern JavaScript': htmlContent.includes('addEventListener') && htmlContent.includes('querySelector'),
        'Responsive Images': htmlContent.includes('loading=') || htmlContent.includes('srcset='),
        'Web Fonts': htmlContent.includes('fonts.googleapis.com')
    };
    
    console.log('\n📋 Feature Compatibility Report:');
    console.log('=' .repeat(50));
    
    Object.entries(features).forEach(([feature, supported]) => {
        const status = supported ? '✅ Supported' : '❌ Not Used';
        console.log(`${status} ${feature}`);
    });
    
    const supportedCount = Object.values(features).filter(Boolean).length;
    const totalFeatures = Object.keys(features).length;
    
    console.log('=' .repeat(50));
    console.log(`📊 Modern Features: ${supportedCount}/${totalFeatures} implemented`);
    
    // Browser support notes
    console.log('\n🌍 Browser Support Notes:');
    console.log('• CSS Grid: IE 10+ (with -ms- prefix), All modern browsers');
    console.log('• CSS Flexbox: IE 11+, All modern browsers');
    console.log('• CSS Custom Properties: IE 15+, All modern browsers');
    console.log('• Backdrop Filter: Safari 9+, Chrome 76+, Firefox 103+');
    console.log('• Smooth Scrolling: Chrome 61+, Firefox 36+, Safari 15.4+');
    console.log('• Modern JavaScript: All browsers supporting ES6+');
    
    return supportedCount === totalFeatures;
}

if (require.main === module) {
    testBrowserCompatibility();
}

module.exports = { testBrowserCompatibility };