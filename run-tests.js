#!/usr/bin/env node

/**
 * Comprehensive Website Testing Script
 * Tests all requirements for the website modernization project
 */

const fs = require('fs');
const path = require('path');

// Test Results
let testResults = {
    structure: [],
    content: [],
    performance: [],
    accessibility: [],
    responsive: [],
    links: []
};

function addResult(category, test, passed, details = '') {
    testResults[category].push({
        test,
        passed,
        details,
        timestamp: new Date().toISOString()
    });
}

function logResult(category, test, passed, details = '') {
    const status = passed ? '✅ PASS' : '❌ FAIL';
    console.log(`${status} [${category.toUpperCase()}] ${test}`);
    if (details) console.log(`   ${details}`);
    addResult(category, test, passed, details);
}

// Test 1: File Structure and HTML Validation
function testFileStructure() {
    console.log('\n🔍 Testing File Structure...');
    
    // Check if index.html exists
    const indexExists = fs.existsSync('index.html');
    logResult('structure', 'index.html exists', indexExists);
    
    if (!indexExists) return;
    
    // Read and parse HTML
    const htmlContent = fs.readFileSync('index.html', 'utf8');
    
    // Test single-page structure
    const sectionCount = (htmlContent.match(/<section[^>]*id=/g) || []).length;
    logResult('structure', 'Single-page with multiple sections', sectionCount >= 5, 
        `Found ${sectionCount} sections with IDs`);
    
    // Test required sections
    const requiredSections = ['hero', 'about', 'experience', 'publications', 'articles', 'contact'];
    requiredSections.forEach(section => {
        const hasSection = htmlContent.includes(`id="${section}"`);
        logResult('structure', `${section} section exists`, hasSection);
    });
    
    // Test semantic HTML
    const semanticElements = ['<nav', '<section', '<article', '<header', '<footer'];
    semanticElements.forEach(element => {
        const hasElement = htmlContent.includes(element);
        logResult('structure', `Uses ${element} semantic element`, hasElement);
    });
    
    // Test meta tags
    const hasViewport = htmlContent.includes('name="viewport"');
    logResult('structure', 'Viewport meta tag present', hasViewport);
    
    const hasDescription = htmlContent.includes('name="description"');
    logResult('structure', 'Description meta tag present', hasDescription);
}

// Test 2: Content Validation
function testContent() {
    console.log('\n📝 Testing Content Structure...');
    
    if (!fs.existsSync('index.html')) return;
    
    const htmlContent = fs.readFileSync('index.html', 'utf8');
    
    // Test publications (4-6 items)
    const publicationCards = (htmlContent.match(/class="publication-card"/g) || []).length;
    logResult('content', 'Publications count (4-6)', 
        publicationCards >= 4 && publicationCards <= 6,
        `Found ${publicationCards} publication cards`);
    
    // Test articles (4-6 items)
    const articleCards = (htmlContent.match(/class="article-card"/g) || []).length;
    logResult('content', 'Articles count (4-6)', 
        articleCards >= 4 && articleCards <= 6,
        `Found ${articleCards} article cards`);
    
    // Test experience timeline
    const experienceItems = (htmlContent.match(/class="experience-item"/g) || []).length;
    logResult('content', 'Experience timeline items', 
        experienceItems >= 3,
        `Found ${experienceItems} experience items`);
    
    // Test external links target="_blank"
    const externalLinks = htmlContent.match(/href="https?:\/\/[^"]*"/g) || [];
    const targetBlankLinks = htmlContent.match(/target="_blank"/g) || [];
    logResult('content', 'External links open in new tab', 
        targetBlankLinks.length > 0,
        `${targetBlankLinks.length} links with target="_blank", ${externalLinks.length} external links found`);
    
    // Test contact information
    const hasEmail = htmlContent.includes('mailto:');
    logResult('content', 'Email contact present', hasEmail);
    
    const socialLinks = (htmlContent.match(/linkedin|scholar\.google|twitter|instagram/g) || []).length;
    logResult('content', 'Social media links (3-4)', 
        socialLinks >= 3,
        `Found ${socialLinks} social media references`);
}

// Test 3: Performance Optimization
function testPerformance() {
    console.log('\n⚡ Testing Performance Optimizations...');
    
    if (!fs.existsSync('index.html')) return;
    
    const htmlContent = fs.readFileSync('index.html', 'utf8');
    
    // Test CSS consolidation (embedded or minimal external)
    const externalCSS = (htmlContent.match(/<link[^>]*rel="stylesheet"/g) || []).length;
    const inlineCSS = (htmlContent.match(/<style/g) || []).length;
    logResult('performance', 'CSS consolidation', 
        externalCSS <= 2,
        `${externalCSS} external stylesheets, ${inlineCSS} inline styles`);
    
    // Test image optimization attributes
    const images = htmlContent.match(/<img[^>]*>/g) || [];
    let optimizedImages = 0;
    images.forEach(img => {
        if (img.includes('loading=') || img.includes('width=') || img.includes('height=')) {
            optimizedImages++;
        }
    });
    logResult('performance', 'Image optimization attributes', 
        optimizedImages > 0,
        `${optimizedImages}/${images.length} images have optimization attributes`);
    
    // Test font loading optimization
    const fontPreconnect = htmlContent.includes('rel="preconnect"');
    logResult('performance', 'Font preconnect optimization', fontPreconnect);
    
    // Test resource hints
    const hasResourceHints = htmlContent.includes('dns-prefetch') || htmlContent.includes('preload');
    logResult('performance', 'Resource hints present', hasResourceHints);
    
    // Estimate file size
    const fileSizeKB = Buffer.byteLength(htmlContent, 'utf8') / 1024;
    logResult('performance', 'HTML file size reasonable', 
        fileSizeKB < 200,
        `File size: ${fileSizeKB.toFixed(1)}KB`);
}

// Test 4: Accessibility Features
function testAccessibility() {
    console.log('\n♿ Testing Accessibility Features...');
    
    if (!fs.existsSync('index.html')) return;
    
    const htmlContent = fs.readFileSync('index.html', 'utf8');
    
    // Test alt attributes on images
    const images = htmlContent.match(/<img[^>]*>/g) || [];
    let imagesWithAlt = 0;
    images.forEach(img => {
        if (img.includes('alt=')) {
            imagesWithAlt++;
        }
    });
    logResult('accessibility', 'Images have alt attributes', 
        imagesWithAlt === images.length,
        `${imagesWithAlt}/${images.length} images have alt attributes`);
    
    // Test heading hierarchy
    const h1Count = (htmlContent.match(/<h1/g) || []).length;
    const headings = (htmlContent.match(/<h[1-6]/g) || []).length;
    logResult('accessibility', 'Proper heading hierarchy', 
        h1Count === 1 && headings >= 10,
        `${h1Count} H1 elements, ${headings} total headings`);
    
    // Test ARIA attributes
    const ariaAttributes = (htmlContent.match(/aria-[a-z]+=/g) || []).length;
    logResult('accessibility', 'ARIA attributes present', 
        ariaAttributes > 0,
        `Found ${ariaAttributes} ARIA attributes`);
    
    // Test keyboard navigation support
    const focusableElements = (htmlContent.match(/tabindex=|<a |<button/g) || []).length;
    logResult('accessibility', 'Focusable elements present', 
        focusableElements >= 10,
        `Found ${focusableElements} focusable elements`);
    
    // Test reduced motion support
    const hasReducedMotion = htmlContent.includes('prefers-reduced-motion');
    logResult('accessibility', 'Reduced motion support', hasReducedMotion);
}

// Test 5: Responsive Design
function testResponsiveDesign() {
    console.log('\n📱 Testing Responsive Design...');
    
    if (!fs.existsSync('index.html')) return;
    
    const htmlContent = fs.readFileSync('index.html', 'utf8');
    
    // Test viewport meta tag
    const viewportContent = htmlContent.match(/name="viewport"[^>]*content="([^"]*)"/);
    const hasProperViewport = viewportContent && viewportContent[1].includes('width=device-width');
    logResult('responsive', 'Proper viewport meta tag', hasProperViewport,
        viewportContent ? `Content: ${viewportContent[1]}` : 'No viewport meta tag found');
    
    // Test media queries
    const mediaQueries = (htmlContent.match(/@media[^{]*{/g) || []).length;
    logResult('responsive', 'CSS media queries present', 
        mediaQueries >= 3,
        `Found ${mediaQueries} media queries`);
    
    // Test mobile navigation
    const hasMobileMenu = htmlContent.includes('mobile-menu') || htmlContent.includes('hamburger');
    logResult('responsive', 'Mobile navigation present', hasMobileMenu);
    
    // Test responsive breakpoints
    const breakpoints = ['768px', '992px', '1200px'];
    let foundBreakpoints = 0;
    breakpoints.forEach(bp => {
        if (htmlContent.includes(bp)) foundBreakpoints++;
    });
    logResult('responsive', 'Multiple breakpoints defined', 
        foundBreakpoints >= 2,
        `Found ${foundBreakpoints} standard breakpoints`);
    
    // Test container max-width
    const hasMaxWidth = htmlContent.includes('max-width') && htmlContent.includes('container');
    logResult('responsive', 'Container max-width set', hasMaxWidth);
}

// Test 6: Navigation and Smooth Scrolling
function testNavigation() {
    console.log('\n🧭 Testing Navigation and Smooth Scrolling...');
    
    if (!fs.existsSync('index.html')) return;
    
    const htmlContent = fs.readFileSync('index.html', 'utf8');
    
    // Test smooth scroll CSS
    const hasSmoothScroll = htmlContent.includes('scroll-behavior: smooth');
    logResult('links', 'CSS smooth scrolling enabled', hasSmoothScroll);
    
    // Test navigation links
    const navLinks = (htmlContent.match(/href="#[^"]*"/g) || []).length;
    logResult('links', 'Internal navigation links', 
        navLinks >= 5,
        `Found ${navLinks} internal navigation links`);
    
    // Test JavaScript navigation
    const hasJSNavigation = htmlContent.includes('addEventListener') && htmlContent.includes('scroll');
    logResult('links', 'JavaScript navigation enhancement', hasJSNavigation);
    
    // Test fixed/sticky navigation
    const hasFixedNav = htmlContent.includes('position: fixed') || htmlContent.includes('position: sticky');
    logResult('links', 'Fixed/sticky navigation', hasFixedNav);
    
    // Test active state management
    const hasActiveState = htmlContent.includes('active') && htmlContent.includes('nav');
    logResult('links', 'Navigation active state', hasActiveState);
}

// Generate Summary Report
function generateSummary() {
    console.log('\n📊 TEST SUMMARY REPORT');
    console.log('=' .repeat(50));
    
    let totalTests = 0;
    let totalPassed = 0;
    
    Object.keys(testResults).forEach(category => {
        const results = testResults[category];
        const passed = results.filter(r => r.passed).length;
        totalTests += results.length;
        totalPassed += passed;
        
        const status = passed === results.length ? '✅' : '⚠️';
        console.log(`${status} ${category.toUpperCase()}: ${passed}/${results.length} tests passed`);
    });
    
    console.log('=' .repeat(50));
    const overallStatus = totalPassed === totalTests ? '🎉 ALL TESTS PASSED' : '⚠️  SOME TESTS FAILED';
    console.log(`${overallStatus}: ${totalPassed}/${totalTests} total tests passed`);
    
    // Save detailed results to file
    const reportData = {
        summary: {
            totalTests,
            totalPassed,
            timestamp: new Date().toISOString(),
            overallStatus: totalPassed === totalTests
        },
        results: testResults
    };
    
    fs.writeFileSync('test-results.json', JSON.stringify(reportData, null, 2));
    console.log('\n📄 Detailed results saved to test-results.json');
    
    return totalPassed === totalTests;
}

// Main execution
function runAllTests() {
    console.log('🚀 Starting Website Modernization Test Suite');
    console.log('Testing Requirements: 1.4, 4.3, 2.3, 4.1');
    
    testFileStructure();
    testContent();
    testPerformance();
    testAccessibility();
    testResponsiveDesign();
    testNavigation();
    
    const allPassed = generateSummary();
    
    if (allPassed) {
        console.log('\n🎉 All requirements validated successfully!');
        process.exit(0);
    } else {
        console.log('\n⚠️  Some tests failed. Please review the results above.');
        process.exit(1);
    }
}

// Run tests if called directly
if (require.main === module) {
    runAllTests();
}

module.exports = { runAllTests, testResults };