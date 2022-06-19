<?php

class modRemontModelServiceUpdateProcessor extends modObjectUpdateProcessor
{
    public $objectType = 'modRemontModelServicev';
    public $classKey = 'modRemontModelService';
    public $languageTopics = ['modremont'];
    //public $permission = 'save';


    /**
     * We doing special check of permission
     * because of our objects is not an instances of modAccessibleObject
     *
     * @return bool|string
     */
    public function beforeSave()
    {
        if (!$this->checkPermissions()) {
            return $this->modx->lexicon('access_denied');
        }

        return true;
    }


    /**
     * @return bool
     */
    public function beforeSet()
    {
        $id = (int)$this->getProperty('id');
        $name = trim($this->getProperty('pagetitle'));
        $uri = trim($this->getProperty('uri'));
        $modelid = trim($this->getProperty('model_id'));
        if (empty($id)) {
            return $this->modx->lexicon('modremont_item_err_ns');
        }
        if (empty($modelid)) {
            return $this->modx->lexicon('modremont_item_err_modelns');
        }



        if (empty($uri)) {
            $this->modx->error->addField('uri', $this->modx->lexicon('modremont_modelservice_err_uri'));
        } elseif ($this->modx->getCount($this->classKey, ['uri' => $uri, 'id:!=' => $id, 'model_id' => $modelid])) {
            $this->modx->error->addField('uri', $this->modx->lexicon('modremont_modelservice_err_uriexist'));
        }
        if (empty($name)) {
            $this->modx->error->addField('pagetitle', $this->modx->lexicon('modremont_modelservice_err_name'));
        } elseif ($this->modx->getCount($this->classKey, ['pagetitle' => $name, 'id:!=' => $id, 'model_id' => $modelid])) {
            $this->modx->error->addField('pagetitle', $this->modx->lexicon('modremont_modelservice_err_ae'));
        }

        return parent::beforeSet();
    }
}

return 'modRemontModelServiceUpdateProcessor';
