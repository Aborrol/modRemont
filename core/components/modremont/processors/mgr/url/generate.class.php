<?php

class modRemontUrlGenerateProcessor extends modObjectProcessor
{
    public $objectType = 'modRemontModelUrl';
    public $classKey = 'modRemontModelUrl';
    public $languageTopics = ['modremont'];
    //public $permission = 'save';


    /**
     * @return array|string
     */
    public function process()
    {
        if (!$this->checkPermissions()) {
            return $this->failure($this->modx->lexicon('access_denied'));
        }

        $base_path = $this->modx->getOption('modremont_basepath');
          $this->modx->removeCollection('modRemontUrl',array());
          $categories = $this->modx->getCollection('modRemontCategory');
          $categoryUrls = [];
          $models = $this->modx->getCollection('modRemontModel');
          $models_category = [];
          $modelsUrls = [];
          $problems = $this->modx->getCollection('modRemontProblem');
          $defects = $this->modx->getCollection('modRemontDefect');
          $services = $this->modx->getCollection('modRemontService');
          $modelservices = $this->modx->getCollection('modRemontModelService');
          foreach($categories as $category){
            $categoryUrls[$category->get('id')] = $category->get('uri');
            $newObject = $this->modx->newObject('modRemontUrl');
            $newObject->set('type', 'category');
            $newObject->set('type_id', $category->get('id'));
            $newObject->set('url', $base_path.$category->get('uri'));
            $newObject->set('pagetitle', $category->get('pagetitle'));
            $modelsIds = [];
            $problemsIds = [];
            $servicesIds = [];
            foreach($models as $model){
              if($model->get('category_id') == $category->get('id'))
              $modelsIds[] = ['id'=> $model->get('id'), 'pagetitle' => $model->get('pagetitle'), 'uri' => $model->get('uri'), 'active' => $model->get('active')];
            }
            foreach($problems as $problem){
              if($problem->get('categories') !='' && in_array($category->get('id'), $problem->get('categories'))){
                foreach($defects as $defect){
                  $defectsIds = [];
                  if($problem->get('id') == $defect->get('problem_id'))
                    $defectsIds = ['id'=> $defect->get('id'), 'pagetitle' => $defect->get('pagetitle'), 'active' => $defect->get('active')];
                }
                $problemsIds[] = ['id'=> $problem->get('id'), 'pagetitle' => $problem->get('pagetitle'), 'uri' => $problem->get('uri'), 'url' => $base_path.$category->get('uri').'/'.$problem->get('url'), 'defects' => $defectsIds, 'active' => $problem->get('active')];
              }
            }
            foreach($services as $service){
              if(is_array($service->get('categories')) && in_array($category->get('id'), $service->get('categories'))){
                $servicesIds[] = ['id'=> $service->get('id'), 'pagetitle' => $service->get('pagetitle'),'price' => $service->get('price'),'priceby' => $service->get('priceby'),'time' => $service->get('time'),'timeby' => $service->get('timeby'), 'uri' => $service->get('uri'), 'url' => $base_path.$category->get('uri').'/'.$service->get('url'),  'active' => $service->get('active')];
              }
            }
            $newObject->set('models', $modelsIds);
            $newObject->set('problems', $problemsIds);
            $newObject->set('services', $servicesIds);
            $newObject->set('active', $category->get('active'));


            $newObject->save();
          }
          foreach($models as $model){
            $models_category[$model->get('id')] = $model->get('category_id');
            $modelsUrls[$model->get('id')] = $model->get('uri');
            $newObject = $this->modx->newObject('modRemontUrl');
            $newObject->set('url', $base_path.$categoryUrls[$model->get('category_id')].'/'.$model->get('uri')); 
            $newObject->set('pagetitle', $model->get('pagetitle'));
            $newObject->set('type', 'model');
            $newObject->set('type_id', $model->get('id'));
            $newObject->set('category_id', $model->get('category_id'));
            $modelServicesIds = [];
            foreach($modelservices as $modelservice){
              if($modelservice->get('model_id') == $model->get('id')){

                $modelServicesIds[] = ['id'=> $model->get('id'), 'pagetitle' => $modelservice->get('pagetitle'), 'url' => $base_path.$categoryUrls[$model->get('category_id')].'/'.$model->get('uri').'/'.$modelservice->get('url'), 'uri' => $modelservice->get('uri'),'defects' => $modelservice->get('defects'), 'active' => $modelservice->get('active')];
              }
            }
            $newObject->set('modelservices', $modelServicesIds);
            $newObject->set('active', $model->get('active'));
            $newObject->save();
          }
          foreach($problems as $problem){
            foreach($problem->get('categories') as $cat_id){
              $newObject = $this->modx->newObject('modRemontUrl');
              $newObject->set('url', $base_path.$categoryUrls[$cat_id].'/'.$problem->get('uri')); 
              $newObject->set('pagetitle', $problem->get('pagetitle'));
              $newObject->set('type', 'problem');
              $newObject->set('type_id', $problem->get('id'));
              $newObject->set('category_id', $cat_id);
              $defectsIds = [];
              foreach($defects as $defect){
                if($defect->get('problem_id') == $problem->get('id')){
                  $defectsIds[] = ['id'=> $defect->get('id'), 'pagetitle' => $defect->get('pagetitle'), 'active' => $defect->get('active')];
                }
              }
              $newObject->set('defects', $defectsIds);
              $newObject->set('active', $problem->get('active'));
              $newObject->save();
            }
          }
          foreach($services as $service){
            foreach($problem->get('categories') as $cat_id){
              $newObject = $this->modx->newObject('modRemontUrl');
              $newObject->set('url', $base_path.$categoryUrls[$cat_id].'/'.$service->get('uri')); 
              $newObject->set('pagetitle', $service->get('pagetitle'));
              $newObject->set('type', 'service');
              $newObject->set('type_id', $service->get('id'));
              $newObject->set('category_id', $cat_id);
              $defectsIds = [];
              foreach($defects as $defect){
                if(is_array($service->get('defects')) && in_array($defect->get('id'), $service->get('defects'))){
                  $defectsIds[] = ['id'=> $defect->get('id'), 'pagetitle' => $defect->get('pagetitle'), 'active' => $defect->get('active')];
                }
              }
              $newObject->set('defects', $defectsIds);
              $newObject->set('active', $service->get('active'));
              $newObject->save();
          }
          }
          foreach($modelservices as $modelservice){
              $newObject = $this->modx->newObject('modRemontUrl');
              $newObject->set('url', $base_path.$categoryUrls[$models_category[$modelservice->get('model_id')]].'/'.$modelsUrls[$modelservice->get('model_id')].'/'.$modelservice->get('uri')); 
              $newObject->set('pagetitle', $modelservice->get('pagetitle'));
              $newObject->set('type', 'modelservice');
              $newObject->set('type_id', $modelservice->get('id'));
              $defectsIds = [];
              foreach($defects as $defect){
                if(is_array($defect->get('defects')) && in_array($defect->get('id'), $modelservice->get('defects'))){
                  $defectsIds[] = ['id'=> $defect->get('id'), 'pagetitle' => $defect->get('pagetitle'),'problem_id' => $defect->get('problem_id'),  'active' => $defect->get('active')];
                }
              }
              $newObject->set('defects', $defectsIds);
              $newObject->set('active', $service->get('active'));
              $newObject->save();
          }
        $sql = "SELECT `id`, `url`, COUNT(`url`) AS `count` FROM `modx_modremont_urls` GROUP BY `url` HAVING `count` > 1";
        $result = $this->modx->query($sql);
        $data = $result->fetchAll(PDO::FETCH_ASSOC);
        return $this->success('success', $data);
    }

}

return 'modRemontUrlGenerateProcessor';