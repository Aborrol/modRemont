<?php

class modRemontDefectUpdateProcessor extends modObjectUpdateProcessor
{
    public $objectType = 'modRemontDefectv';
    public $classKey = 'modRemontDefect';
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
        if (empty($id)) {
            return $this->modx->lexicon('modremont_item_err_ns');
        }
        if (empty($name)) {
            $this->modx->error->addField('pagetitle', $this->modx->lexicon('modremont_defect_err_name'));
        } elseif ($this->modx->getCount($this->classKey, ['pagetitle' => $name,'id:!=' => $id])) {
            $this->modx->error->addField('pagetitle', $this->modx->lexicon('modremont_defect_err_ae'));
        }

        return parent::beforeSet();
    }
}

return 'modRemontDefectUpdateProcessor';
