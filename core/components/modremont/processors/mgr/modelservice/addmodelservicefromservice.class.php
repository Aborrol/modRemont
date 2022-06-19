<?php

class modRemontModelServiceFromCategoryProcessor extends modObjectProcessor
{
    public $objectType = 'modRemontModelService';
    public $classKey = 'modRemontModelService';
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

        
        $ids = $this->modx->fromJSON($this->getProperty('ids'));
        if (empty($ids)) {
            return $this->failure($this->modx->lexicon('modremont_item_err_ns'));
        }
       
        foreach ($ids as $id) {

            if (!$object = $this->modx->getObject('modRemontService', $id)) {
                return $this->failure($this->modx->lexicon('modremont_service_err_nf'));
            }

            $categories = $object->get('categories');

            foreach($categories as $category){

                $models = $this->modx->getCollection('modRemontModel', ['category_id' => $category]);
                
                foreach($models as $model){

                    $model_id = $model->get('id');
                    $newService = $this->modx->newObject('modRemontModelService');
                    $newService->fromArray($object->toArray());
                    $newService->set('model_id',$model_id);
                    $newService->save();

                } 
            }
        }

        return $this->success();
    }

}

return 'modRemontModelServiceFromCategoryProcessor';
