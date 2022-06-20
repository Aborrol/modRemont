<div class="breadcrumbs ">
  {$_modx->runSnippet('modRemontCrumbs', [
    'outputSeparator'=>'<li> / </li>',
    'limit'=>'7',
    'tpl'=> '@INLINE <li itemscope="" itemprop="itemListElement" itemtype="http://schema.org/ListItem">
    <a title="{$menutitle}" itemprop="item" href="{$link}">{$menutitle}</a>
    <meta itemprop="name" content="{$menutitle}"> <meta itemprop="position" content="{$idx}"></li>',
    'tplCurrent'=>'@INLINE  
         <li itemscope="" itemprop="itemListElement" itemtype="http://schema.org/ListItem">
         <meta itemprop="item" content="{$_modx->config.site_url}{$link}">
        <span itemprop="name">{$menutitle}</span>
        </li>',
    'tplWrapper'=>'@INLINE <ul class="breadcrumb" itemscope="" itemtype="http://schema.org/BreadcrumbList">
   {$output}</ul>',
    'showHome'=>'1',
    'extra' => $_modx->getPlaceholder('breadcrumb_urls')
    'showAtHome'=>'0',
  ])}
  </div>