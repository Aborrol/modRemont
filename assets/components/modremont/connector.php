<?php
if (file_exists(dirname(dirname(dirname(dirname(__FILE__)))) . '/config.core.php')) {
    /** @noinspection PhpIncludeInspection */
    require_once dirname(dirname(dirname(dirname(__FILE__)))) . '/config.core.php';
} else {
    require_once dirname(dirname(dirname(dirname(dirname(__FILE__))))) . '/config.core.php';
}
/** @noinspection PhpIncludeInspection */
require_once MODX_CORE_PATH . 'config/' . MODX_CONFIG_KEY . '.inc.php';
/** @noinspection PhpIncludeInspection */
require_once MODX_CONNECTORS_PATH . 'index.php';
/** @var modRemont $modRemont */
$modRemont = $modx->getService('modRemont', 'modRemont', MODX_CORE_PATH . 'components/modremont/model/');
$modx->lexicon->load('modremont:default');

// handle request
$corePath = $modx->getOption('modremont_core_path', null, $modx->getOption('core_path') . 'components/modremont/');
$path = $modx->getOption('processorsPath', $modRemont->config, $corePath . 'processors/');
$modx->getRequest();

/** @var modConnectorRequest $request */
$request = $modx->request;
$request->handleRequest([
    'processors_path' => $path,
    'location' => '',
]);