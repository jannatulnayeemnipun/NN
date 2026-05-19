#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Navigation menu templates
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

function getDepth(filePath) {
  const dirs = filePath.split(path.sep).length - 1;
  if (filePath.includes('service-areas')) {
    return filePath.match(/service-areas\/[^\/]+\/[^\/]+/) ? 'twoLevel' : 'oneLevel';
  }
  if (filePath.includes('portfolio')) {
    return filePath.includes('portfolio/index.html') ? 'oneLevel' : 'twoLevel';
  }
  return 'oneLevel';
}

function updateNav(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const depth = getDepth(filePath);
    const navTemplate = navTemplates[depth];
    const navPattern = /<nav[\s\S]*?<\/nav>/i;
    
    if (!navPattern.test(content)) return false;
    
    const updated = content.replace(navPattern, navTemplate);
    fs.writeFileSync(filePath, updated, 'utf8');
    console.log(`✓ ${filePath}`);
    return true;
  } catch (err) {
    console.error(`✗ ${filePath}: ${err.message}`);
    return false;
  }
}

function walkDir(dir) {
  let files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith('.')) {
      files = files.concat(walkDir(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

console.log('🚀 Updating navigation on all HTML files...\n');
const htmlFiles = walkDir('.');
let updated = 0;

for (const file of htmlFiles) {
  if (updateNav(file)) updated++;
}

console.log(`\n✅ Complete! Updated ${updated}/${htmlFiles.length} files`);
