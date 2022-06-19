<?php

class modRemontModelCreateProcessor extends modObjectCreateProcessor
{
    public $objectType = 'modRemontModel';
    public $classKey = 'modRemontModel';
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
            $this->modx->error->addField('uri', $this->modx->lexicon('modremont_model_err_uri'));
        } elseif ($this->modx->getCount($this->classKey, ['uri' => $uri])) {
            $this->modx->error->addField('uri', $this->modx->lexicon('modremont_model_err_uriexist'));
        }
        if (empty($name)) {
            $this->modx->error->addField('pagetitle', $this->modx->lexicon('modremont_model_err_name'));
        } elseif ($this->modx->getCount($this->classKey, ['pagetitle' => $name])) {
            $this->modx->error->addField('pagetitle', $this->modx->lexicon('modremont_model_err_ae'));
        }

        return parent::beforeSet();
    }
    public function afterSave() {
        $isgetservices = (int)$this->getProperty('isgetservices');
      if($isgetservices){
        $this->getServicesFromCategory();
      }
        return true;
    }



    public function getServicesFromCategory()
    {
        $id = $this->object->get('id');
        $category_id = $this->object->get('category_id');
            $services = $this->modx->getCollection('modRemontService', ["FIND_IN_SET('\"{$category_id}\"', REPLACE(REPLACE(categories, '[', ''),']','')) > 0"]);
            if(is_array($services) && !empty($services)) {
                foreach($services as $service) {
                    $newService = $this->modx->newObject('modRemontModelService');
                    $newService->fromArray($service->toArray());
                    $newService->set('model_id',$id);
                    $newService->save();
                }
            }
    }
}

return 'modRemontModelCreateProcessor';