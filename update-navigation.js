#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Navigation menu HTML templates based on relative path depth
const navTemplates = {
  root: `<nav>
  <div class="container nav-inner">
    <div class="nav-logo">
      <div class="logo-box">Y</div>
      <div class="logo-text">YOUR LOGO <span>SEO EXPERT</span></div>
    </div>
    <div class="nav-links">
      <a href="index.html">Home</a>
      
      <div class="nav-item">
        <button class="nav-dropdown-trigger">Services</button>
        <div class="dropdown-menu">
          <a href="services/wordpress-seo.html" class="dropdown-item">WordPress SEO</a>
          <a href="services/wix-seo.html" class="dropdown-item">Wix SEO</a>
          <a href="services/magento-seo.html" class="dropdown-item">Magento SEO</a>
          <a href="services/squarespace-seo.html" class="dropdown-item">Squarespace SEO</a>
          <a href="services/shopify-seo.html" class="dropdown-item">Shopify SEO</a>
          <a href="services/ecommerce-seo.html" class="dropdown-item">E-commerce SEO</a>
          <a href="services/big-ecommerce-seo.html" class="dropdown-item">Big E-commerce SEO</a>
          <div class="dropdown-divider"></div>
          <a href="services/local-seo.html" class="dropdown-item">Local SEO</a>
          <a href="services/on-page-seo.html" class="dropdown-item">On-Page SEO</a>
          <a href="services/off-page-seo.html" class="dropdown-item">Off-Page SEO</a>
          <a href="services/technical-seo.html" class="dropdown-item">Technical SEO</a>
          <div class="dropdown-divider"></div>
          <a href="services/keyword-research.html" class="dropdown-item">Keyword Research</a>
          <a href="services/competitor-analysis.html" class="dropdown-item">Competitor Analysis</a>
          <a href="services/website-audit.html" class="dropdown-item">Website Audit</a>
          <a href="services/google-ads.html" class="dropdown-item">Google Ads</a>
          <a href="services/youtube-seo.html" class="dropdown-item">YouTube SEO</a>
        </div>
      </div>

      <div class="nav-item">
        <button class="nav-dropdown-trigger">Service Areas</button>
        <div class="dropdown-menu">
          <a href="service-areas/usa/index.html" class="dropdown-item">United States</a>
          <a href="service-areas/uk/index.html" class="dropdown-item">United Kingdom</a>
          <a href="service-areas/canada/index.html" class="dropdown-item">Canada</a>
          <a href="service-areas/australia/index.html" class="dropdown-item">Australia</a>
          <div class="dropdown-divider"></div>
          <a href="service-areas/germany/index.html" class="dropdown-item">Germany</a>
          <a href="service-areas/netherlands/index.html" class="dropdown-item">Netherlands</a>
          <a href="service-areas/switzerland/index.html" class="dropdown-item">Switzerland</a>
          <a href="service-areas/sweden/index.html" class="dropdown-item">Sweden</a>
          <a href="service-areas/norway/index.html" class="dropdown-item">Norway</a>
          <div class="dropdown-divider"></div>
          <a href="service-areas/ireland/index.html" class="dropdown-item">Ireland</a>
          <a href="service-areas/new-zealand/index.html" class="dropdown-item">New Zealand</a>
          <a href="service-areas/singapore/index.html" class="dropdown-item">Singapore</a>
        </div>
      </div>

      <a href="portfolio/index.html">Portfolio</a>
      <a href="case-studies/index.html">Case Studies</a>

      <div class="nav-item">
        <button class="nav-dropdown-trigger">Consultant Pages</button>
        <div class="dropdown-menu">
          <a href="consultants/wordpress-seo-consultant.html" class="dropdown-item">WordPress SEO Consultant</a>
          <a href="consultants/wix-seo-consultant.html" class="dropdown-item">Wix SEO Consultant</a>
          <a href="consultants/magento-seo-consultant.html" class="dropdown-item">Magento SEO Consultant</a>
          <a href="consultants/squarespace-seo-consultant.html" class="dropdown-item">Squarespace SEO Consultant</a>
          <a href="consultants/shopify-seo-consultant.html" class="dropdown-item">Shopify SEO Consultant</a>
          <div class="dropdown-divider"></div>
          <a href="consultants/ecommerce-seo-consultant.html" class="dropdown-item">E-commerce SEO Consultant</a>
          <a href="consultants/big-ecommerce-seo-consultant.html" class="dropdown-item">Big E-commerce Consultant</a>
          <a href="consultants/walmart-seo-consultant.html" class="dropdown-item">Walmart SEO Consultant</a>
          <div class="dropdown-divider"></div>
          <a href="consultants/local-seo-consultant.html" class="dropdown-item">Local SEO Consultant</a>
          <a href="consultants/youtube-seo-consultant.html" class="dropdown-item">YouTube SEO Consultant</a>
        </div>
      </div>

      <a href="blog/index.html">Blog</a>
    </div>
    <a href="index.html" class="btn-primary">Get Free SEO Audit</a>
  </div>
</nav>`,

  oneLevel: `<nav>
  <div class="container nav-inner">
    <div class="nav-logo">
      <div class="logo-box">Y</div>
      <div class="logo-text">YOUR LOGO <span>SEO EXPERT</span></div>
    </div>
    <div class="nav-links">
      <a href="../index.html">Home</a>
      
      <div class="nav-item">
        <button class="nav-dropdown-trigger">Services</button>
        <div class="dropdown-menu">
          <a href="../services/wordpress-seo.html" class="dropdown-item">WordPress SEO</a>
          <a href="../services/wix-seo.html" class="dropdown-item">Wix SEO</a>
          <a href="../services/magento-seo.html" class="dropdown-item">Magento SEO</a>
          <a href="../services/squarespace-seo.html" class="dropdown-item">Squarespace SEO</a>
          <a href="../services/shopify-seo.html" class="dropdown-item">Shopify SEO</a>
          <a href="../services/ecommerce-seo.html" class="dropdown-item">E-commerce SEO</a>
          <a href="../services/big-ecommerce-seo.html" class="dropdown-item">Big E-commerce SEO</a>
          <div class="dropdown-divider"></div>
          <a href="../services/local-seo.html" class="dropdown-item">Local SEO</a>
          <a href="../services/on-page-seo.html" class="dropdown-item">On-Page SEO</a>
          <a href="../services/off-page-seo.html" class="dropdown-item">Off-Page SEO</a>
          <a href="../services/technical-seo.html" class="dropdown-item">Technical SEO</a>
          <div class="dropdown-divider"></div>
          <a href="../services/keyword-research.html" class="dropdown-item">Keyword Research</a>
          <a href="../services/competitor-analysis.html" class="dropdown-item">Competitor Analysis</a>
          <a href="../services/website-audit.html" class="dropdown-item">Website Audit</a>
          <a href="../services/google-ads.html" class="dropdown-item">Google Ads</a>
          <a href="../services/youtube-seo.html" class="dropdown-item">YouTube SEO</a>
        </div>
      </div>

      <div class="nav-item">
        <button class="nav-dropdown-trigger">Service Areas</button>
        <div class="dropdown-menu">
          <a href="../service-areas/usa/index.html" class="dropdown-item">United States</a>
          <a href="../service-areas/uk/index.html" class="dropdown-item">United Kingdom</a>
          <a href="../service-areas/canada/index.html" class="dropdown-item">Canada</a>
          <a href="../service-areas/australia/index.html" class="dropdown-item">Australia</a>
          <div class="dropdown-divider"></div>
          <a href="../service-areas/germany/index.html" class="dropdown-item">Germany</a>
          <a href="../service-areas/netherlands/index.html" class="dropdown-item">Netherlands</a>
          <a href="../service-areas/switzerland/index.html" class="dropdown-item">Switzerland</a>
          <a href="../service-areas/sweden/index.html" class="dropdown-item">Sweden</a>
          <a href="../service-areas/norway/index.html" class="dropdown-item">Norway</a>
          <div class="dropdown-divider"></div>
          <a href="../service-areas/ireland/index.html" class="dropdown-item">Ireland</a>
          <a href="../service-areas/new-zealand/index.html" class="dropdown-item">New Zealand</a>
          <a href="../service-areas/singapore/index.html" class="dropdown-item">Singapore</a>
        </div>
      </div>

      <a href="../portfolio/index.html">Portfolio</a>
      <a href="../case-studies/index.html">Case Studies</a>

      <div class="nav-item">
        <button class="nav-dropdown-trigger">Consultant Pages</button>
        <div class="dropdown-menu">
          <a href="../consultants/wordpress-seo-consultant.html" class="dropdown-item">WordPress SEO Consultant</a>
          <a href="../consultants/wix-seo-consultant.html" class="dropdown-item">Wix SEO Consultant</a>
          <a href="../consultants/magento-seo-consultant.html" class="dropdown-item">Magento SEO Consultant</a>
          <a href="../consultants/squarespace-seo-consultant.html" class="dropdown-item">Squarespace SEO Consultant</a>
          <a href="../consultants/shopify-seo-consultant.html" class="dropdown-item">Shopify SEO Consultant</a>
          <div class="dropdown-divider"></div>
          <a href="../consultants/ecommerce-seo-consultant.html" class="dropdown-item">E-commerce SEO Consultant</a>
          <a href="../consultants/big-ecommerce-seo-consultant.html" class="dropdown-item">Big E-commerce Consultant</a>
          <a href="../consultants/walmart-seo-consultant.html" class="dropdown-item">Walmart SEO Consultant</a>
          <div class="dropdown-divider"></div>
          <a href="../consultants/local-seo-consultant.html" class="dropdown-item">Local SEO Consultant</a>
          <a href="../consultants/youtube-seo-consultant.html" class="dropdown-item">YouTube SEO Consultant</a>
        </div>
      </div>

      <a href="../blog/index.html">Blog</a>
    </div>
    <a href="../index.html" class="btn-primary">Get Free SEO Audit</a>
  </div>
</nav>`,

  twoLevel: `<nav>
  <div class="container nav-inner">
    <div class="nav-logo">
      <div class="logo-box">Y</div>
      <div class="logo-text">YOUR LOGO <span>SEO EXPERT</span></div>
    </div>
    <div class="nav-links">
      <a href="../../index.html">Home</a>
      
      <div class="nav-item">
        <button class="nav-dropdown-trigger">Services</button>
        <div class="dropdown-menu">
          <a href="../../services/wordpress-seo.html" class="dropdown-item">WordPress SEO</a>
          <a href="../../services/wix-seo.html" class="dropdown-item">Wix SEO</a>
          <a href="../../services/magento-seo.html" class="dropdown-item">Magento SEO</a>
          <a href="../../services/squarespace-seo.html" class="dropdown-item">Squarespace SEO</a>
          <a href="../../services/shopify-seo.html" class="dropdown-item">Shopify SEO</a>
          <a href="../../services/ecommerce-seo.html" class="dropdown-item">E-commerce SEO</a>
          <a href="../../services/big-ecommerce-seo.html" class="dropdown-item">Big E-commerce SEO</a>
          <div class="dropdown-divider"></div>
          <a href="../../services/local-seo.html" class="dropdown-item">Local SEO</a>
          <a href="../../services/on-page-seo.html" class="dropdown-item">On-Page SEO</a>
          <a href="../../services/off-page-seo.html" class="dropdown-item">Off-Page SEO</a>
          <a href="../../services/technical-seo.html" class="dropdown-item">Technical SEO</a>
          <div class="dropdown-divider"></div>
          <a href="../../services/keyword-research.html" class="dropdown-item">Keyword Research</a>
          <a href="../../services/competitor-analysis.html" class="dropdown-item">Competitor Analysis</a>
          <a href="../../services/website-audit.html" class="dropdown-item">Website Audit</a>
          <a href="../../services/google-ads.html" class="dropdown-item">Google Ads</a>
          <a href="../../services/youtube-seo.html" class="dropdown-item">YouTube SEO</a>
        </div>
      </div>

      <div class="nav-item">
        <button class="nav-dropdown-trigger">Service Areas</button>
        <div class="dropdown-menu">
          <a href="../../service-areas/usa/index.html" class="dropdown-item">United States</a>
          <a href="../../service-areas/uk/index.html" class="dropdown-item">United Kingdom</a>
          <a href="../../service-areas/canada/index.html" class="dropdown-item">Canada</a>
          <a href="../../service-areas/australia/index.html" class="dropdown-item">Australia</a>
          <div class="dropdown-divider"></div>
          <a href="../../service-areas/germany/index.html" class="dropdown-item">Germany</a>
          <a href="../../service-areas/netherlands/index.html" class="dropdown-item">Netherlands</a>
          <a href="../../service-areas/switzerland/index.html" class="dropdown-item">Switzerland</a>
          <a href="../../service-areas/sweden/index.html" class="dropdown-item">Sweden</a>
          <a href="../../service-areas/norway/index.html" class="dropdown-item">Norway</a>
          <div class="dropdown-divider"></div>
          <a href="../../service-areas/ireland/index.html" class="dropdown-item">Ireland</a>
          <a href="../../service-areas/new-zealand/index.html" class="dropdown-item">New Zealand</a>
          <a href="../../service-areas/singapore/index.html" class="dropdown-item">Singapore</a>
        </div>
      </div>

      <a href="../../portfolio/index.html">Portfolio</a>
      <a href="../../case-studies/index.html">Case Studies</a>

      <div class="nav-item">
        <button class="nav-dropdown-trigger">Consultant Pages</button>
        <div class="dropdown-menu">
          <a href="../../consultants/wordpress-seo-consultant.html" class="dropdown-item">WordPress SEO Consultant</a>
          <a href="../../consultants/wix-seo-consultant.html" class="dropdown-item">Wix SEO Consultant</a>
          <a href="../../consultants/magento-seo-consultant.html" class="dropdown-item">Magento SEO Consultant</a>
          <a href="../../consultants/squarespace-seo-consultant.html" class="dropdown-item">Squarespace SEO Consultant</a>
          <a href="../../consultants/shopify-seo-consultant.html" class="dropdown-item">Shopify SEO Consultant</a>
          <div class="dropdown-divider"></div>
          <a href="../../consultants/ecommerce-seo-consultant.html" class="dropdown-item">E-commerce SEO Consultant</a>
          <a href="../../consultants/big-ecommerce-seo-consultant.html" class="dropdown-item">Big E-commerce Consultant</a>
          <a href="../../consultants/walmart-seo-consultant.html" class="dropdown-item">Walmart SEO Consultant</a>
          <div class="dropdown-divider"></div>
          <a href="../../consultants/local-seo-consultant.html" class="dropdown-item">Local SEO Consultant</a>
          <a href="../../consultants/youtube-seo-consultant.html" class="dropdown-item">YouTube SEO Consultant</a>
        </div>
      </div>

      <a href="../../blog/index.html">Blog</a>
    </div>
    <a href="../../index.html" class="btn-primary">Get Free SEO Audit</a>
  </div>
</nav>`
};

// Function to determine depth based on file path
function getDepth(filePath) {
  const parts = filePath.split(path.sep).filter(p => p && p !== '.' && p !== 'index.html');
  // Count directories from root
  if (filePath.includes('service-areas')) {
    const areaMatch = filePath.match(/service-areas\/([^\/]+)\/([^\/]+)/);
    if (areaMatch && areaMatch[2] !== 'index.html') return 'twoLevel'; // service-areas/country/state
    return 'oneLevel'; // service-areas/country/index.html
  }
  if (filePath.includes('portfolio')) {
    const portfolioMatch = filePath.match(/portfolio\/([^\/]+)/);
    if (portfolioMatch && portfolioMatch[1] !== 'index.html') return 'twoLevel'; // portfolio/category/index.html
    return 'oneLevel'; // portfolio/index.html
  }
  // One level deep: services/, consultants/, blog/, case-studies/
  return 'oneLevel';
}

// Function to replace navigation in HTML content
function replaceNavigation(content, depth) {
  const navTemplate = navTemplates[depth] || navTemplates.oneLevel;
  
  // Match old nav section (flexible pattern)
  const navPattern = /<nav[\s\S]*?<\/nav>/i;
  
  if (navPattern.test(content)) {
    return content.replace(navPattern, navTemplate);
  }
  
  // If no nav found, insert after opening body tag
  if (content.includes('<body')) {
    return content.replace(/(<body[^>]*>)/i, `$1\n${navTemplate}`);
  }
  
  return content;
}

// Main function
async function updateAllNavigation() {
  const patterns = [
    'services/*.html',
    'consultants/*.html',
    'blog/*.html',
    'case-studies/*.html',
    'portfolio/index.html',
    'portfolio/*/*.html',
    'service-areas/*/index.html',
    'service-areas/*/**.html'
  ];

  let totalFiles = 0;
  let updatedFiles = 0;

  for (const pattern of patterns) {
    glob(pattern, (err, files) => {
      if (err) {
        console.error(`Error finding files for pattern ${pattern}:`, err);
        return;
      }

      files.forEach(filePath => {
        totalFiles++;
        
        try {
          const content = fs.readFileSync(filePath, 'utf8');
          const depth = getDepth(filePath);
          const updatedContent = replaceNavigation(content, depth);
          
          if (updatedContent !== content) {
            fs.writeFileSync(filePath, updatedContent, 'utf8');
            updatedFiles++;
            console.log(`✓ Updated: ${filePath} (depth: ${depth})`);
          } else {
            console.log(`- Skipped: ${filePath} (no nav found)`);
          }
        } catch (error) {
          console.error(`✗ Error updating ${filePath}:`, error.message);
        }
      });

      // Summary after all patterns processed
      if (patterns.indexOf(pattern) === patterns.length - 1) {
        console.log(`\n📊 Summary: Updated ${updatedFiles}/${totalFiles} files`);
      }
    });
  }
}

// Run the update
console.log('🚀 Starting navigation update for all HTML files...\n');
updateAllNavigation();
