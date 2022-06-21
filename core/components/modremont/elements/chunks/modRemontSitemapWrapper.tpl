<?xml version="1.0" encoding="{'modx_charset' | option}"?>
<urlset xmlns="{$schema}">
{$output}
{$_modx->runSnippet('modRemontSitemap',['tplWrapper'=>'@INLINE {$output}', 'fast'=>1, 'mincount'=>1, 'forceXML'=>0])}
</urlset>