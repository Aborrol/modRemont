<?php
/** @var modX $modx */
/** @var array $scriptProperties */
/** @var modRemont $modRemont */
$modRemont = $modx->getService('modRemont', 'modRemont', MODX_CORE_PATH . 'components/modremont/model/', $scriptProperties);
if (!$modRemont) {
    return 'Could not load modRemont class!';
}

//
switch ($modx->event->name) {

    case 'OnPageNotFound':
        /** @var modManagerController $controller */

            $baseUrl = $modx->getOption('modremont_base_url', null, '');
            $typeTpls = $modx->getOption('modremont_typetpls', null, '');
            $alias = $modx->context->getOption('request_param_alias', 'q');
            if (!isset($_REQUEST[$alias])) {return false;}
            $request = $_REQUEST[$alias];
            $tmp = explode('/', $request);
            
            if(($baseUrl && $tmp[0] != $baseUrl) || count($tmp) < 2){
                // Если базовый префикс url не пустой и не равен первомму разделу или нет хотябы двух разделов - то выходим
                return false;
            }      
            	if (!$section = $modx->findResource($tmp[0] . '/')) {
            		// Если вдруг раздел куда-то делся - выходим.
            		return false;
            	}
            $last = str_replace('.html', '', $tmp[count($tmp)-1]);
            echo $request;
            echo '<br/>';
            if ($last != '') {
                echo implode('/',$tmp).'/';
                $modx->sendRedirect(implode('/',$tmp).'/');
            }
            array_shift($tmp);
            array_pop($tmp);
            $url = implode('/',$tmp);
            if ($res = $modx->getObject('modRemontUrl', ['url' => $url, 'active' => 1])) {
                $type = $res->get('type');
                $type_id = $res->get('type_id');
                $typeTpls = json_decode($typeTpls, true);
                $template_id = $typeTpls[$type];
                $objController = [
                    'category' => 'modRemontCategory',
                    'model' => 'modRemontModel',
                    'service' => 'modRemontService',
                    'modelservice' => 'modRemontModelService'
                ];
                if (!$data = $modx->getObject($objController[$type],['id' => $type_id, 'active' => 1])) {
                    return false;
                }
                $modx->setPlaceholder('template_id',$template_id);
                $modx->toPlaceholders($data->toArray(), 'mr');
            
                $modx->sendForward($section);
            }

        break;
        case 'OnLoadWebDocument':
            if($modx->getPlaceholder('template_id')){
                $modx->resource->set('template', $modx->getPlaceholder('template_id'));
                $modx->resource->set('cacheable', false);
            }
        break;
}