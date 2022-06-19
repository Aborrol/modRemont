<?php

class modRemontDefectCreateProcessor extends modObjectCreateProcessor
{
    public $objectType = 'modRemontDefect';
    public $classKey = 'modRemontDefect';
    public $languageTopics = ['modremont'];
    //public $permission = 'create';


    /**
     * @return bool
     */
    public function beforeSet()
    {
        $name = trim($this->getProperty('pagetitle'));
        if (empty($name)) {
            $this->modx->error->addField('pagetitle', $this->modx->lexicon('modremont_defect_err_name'));
        } elseif ($this->modx->getCount($this->classKey, ['pagetitle' => $name])) {
            $this->modx->error->addField('pagetitle', $this->modx->lexicon('modremont_defect_err_ae'));
        }

        return parent::beforeSet();
    }

}

return 'modRemontDefectCreateProcessor';