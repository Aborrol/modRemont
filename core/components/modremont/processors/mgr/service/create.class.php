<?php

class modRemontServiceCreateProcessor extends modObjectCreateProcessor
{
    public $objectType = 'modRemontService';
    public $classKey = 'modRemontService';
    public $languageTopics = ['modremont'];
    //public $permission = 'create';


    /**
     * @return bool
     */
    public function beforeSet()
    {

        $name = trim($this->getProperty('pagetitle'));
        $uri = trim($this->getProperty('uri'));


        if (empty($uri)) {
            $this->modx->error->addField('uri', $this->modx->lexicon('modremont_service_err_uri'));
        } elseif ($this->modx->getCount($this->classKey, ['uri' => $uri])) {
            $this->modx->error->addField('uri', $this->modx->lexicon('modremont_service_err_uriexist'));
        }
        if (empty($name)) {
            $this->modx->error->addField('pagetitle', $this->modx->lexicon('modremont_service_err_name'));
        } elseif ($this->modx->getCount($this->classKey, ['pagetitle' => $name])) {
            $this->modx->error->addField('pagetitle', $this->modx->lexicon('modremont_service_err_ae'));
        }

        return parent::beforeSet();
    }
    public function afterSave() {
        $isaddtoservices = (int)$this->getProperty('isaddtoservices');
      if($isaddtoservices){
        $this->addServiceToModels();
      }
        return true;
    }



    public function addServiceToModels()
    {
        $id = $this->object->get('id');
        $categories = $this->object->get('categories');
        foreach($categories as $category){
            $models = $this->modx->getCollection('modRemontModel', ['category_id' => $category]);
            if(is_array($models) && !empty($models)) {
                foreach($models as $model) {
                    $newService = $this->modx->newObject('modRemontModelService');
                    $newService->fromArray($this->object->toArray());
                    $newService->set('model_id',$model->get('id'));
                    $newService->save();
                }
            }
        }
    }
}

return 'modRemontServiceCreateProcessor';