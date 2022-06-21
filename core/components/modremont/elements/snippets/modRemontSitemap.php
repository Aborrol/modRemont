<?php
/** @var modX $modx */
/** @var array $scriptProperties */
/** @var modRemont $modRemont */
/*
[[!pdoSitemap?
    &tplWrapper=`modRemontSitemapWrapper`
]]
*/

$bp = $modx->getOption('modremont_base_url', 'remont');
$modRemont = $modx->getService('modRemont', 'modRemont', MODX_CORE_PATH . 'components/modremont/model/', $scriptProperties);
if (!$modRemont) {
    return 'Could not load modRemont class!';
}

$urls = $modx->getIterator('modRemontUrl',['active' => 1]);
// $now = time();
$list = [];
foreach($urls as $url){
    $type = $url->get('type');
    $url = $bp.'/'.$url->get('url').'/';
    $priority = '0.25';
    $update = 'monthly';
    
    switch($type){
        case 'model':
            $priority = '1.0';
            $update = 'daily';
        case 'modelservice':
            $priority = '0.75';
            $update = 'weekly';
        case 'problem':
            $priority = '0.5';
            $update = 'monthly';
        break;
    }
    $data = ['url'=>$url, 'priority'=>$priority, 'update'=> $update];
    $list[] = $modx->getChunk('modRemontSitemapItem', $data);
}
$output = implode("", $list);
return $output;