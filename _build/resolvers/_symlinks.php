<?php
/** @var xPDOTransport $transport */
/** @var array $options */
/** @var modX $modx */
if ($transport->xpdo) {
    $modx =& $transport->xpdo;

    $dev = MODX_BASE_PATH . 'Extras/modRemont/';
    /** @var xPDOCacheManager $cache */
    $cache = $modx->getCacheManager();
    if (file_exists($dev) && $cache) {
        if (!is_link($dev . 'assets/components/modremont')) {
            $cache->deleteTree(
                $dev . 'assets/components/modremont/',
                ['deleteTop' => true, 'skipDirs' => false, 'extensions' => []]
            );
            symlink(MODX_ASSETS_PATH . 'components/modremont/', $dev . 'assets/components/modremont');
        }
        if (!is_link($dev . 'core/components/modremont')) {
            $cache->deleteTree(
                $dev . 'core/components/modremont/',
                ['deleteTop' => true, 'skipDirs' => false, 'extensions' => []]
            );
            symlink(MODX_CORE_PATH . 'components/modremont/', $dev . 'core/components/modremont');
        }
    }
}

return true;